import fs from "fs";
import path from "path";
import chalk from "chalk";

/**
 * Generate shell completions for the ber command
 */
export default async function generateCompletions() {
  const commandsDir = path.join(process.cwd(), ".ber/commands");
  const commands = fs
    .readdirSync(commandsDir)
    .filter((dir) => fs.statSync(path.join(commandsDir, dir)).isDirectory());

  const completions = {
    bash: generateBashCompletions(commands),
    zsh: generateZshCompletions(commands),
  };

  // Print instructions for both bash and zsh
  console.log(chalk.blue("\nTerminal completion for ber command"));
  console.log(chalk.blue("=".repeat(50)));

  console.log(chalk.yellow("\nBash completion:"));
  console.log(chalk.white("Add the following to your ~/.bashrc file:"));
  console.log("");
  console.log(completions.bash);

  console.log(chalk.yellow("\nZsh completion:"));
  console.log(chalk.white("Add the following to your ~/.zshrc file:"));
  console.log("");
  console.log(completions.zsh);
}

/**
 * Generate bash completion script
 */
function generateBashCompletions(commands: string[]): string {
  const subcommands: Record<string, string[]> = {};

  // Collect subcommands for each command
  for (const cmd of commands) {
    const subcommandDir = path.join(process.cwd(), ".ber/commands", cmd);
    const availableSubcommands = fs
      .readdirSync(subcommandDir)
      .filter((dir) =>
        fs.statSync(path.join(subcommandDir, dir)).isDirectory()
      );
    subcommands[cmd] = availableSubcommands;
  }

  // Generate the bash completion script
  return `
# Ber command completion for bash
_ber_completion() {
  local cur prev
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  # Main commands
  if [[ \${COMP_CWORD} == 1 ]]; then
    COMPREPLY=( $(compgen -W "${commands.join(" ")}" -- \${cur}) )
    return 0
  fi

  # Subcommands
  if [[ \${COMP_CWORD} == 2 ]]; then
    case "\${prev}" in
${commands
  .map((cmd) => {
    return `      "${cmd}")
        COMPREPLY=( $(compgen -W "${subcommands[cmd].join(" ")}" -- \${cur}) )
        ;;`;
  })
  .join("\n")}
    esac
    return 0
  fi
}

complete -F _ber_completion ber
`;
}

/**
 * Generate zsh completion script
 */
function generateZshCompletions(commands: string[]): string {
  const subcommands: Record<string, string[]> = {};

  // Collect subcommands for each command
  for (const cmd of commands) {
    const subcommandDir = path.join(process.cwd(), ".ber/commands", cmd);
    const availableSubcommands = fs
      .readdirSync(subcommandDir)
      .filter((dir) =>
        fs.statSync(path.join(subcommandDir, dir)).isDirectory()
      );
    subcommands[cmd] = availableSubcommands;
  }

  // Generate the zsh completion script
  return `
# Ber command completion for zsh
_ber() {
  local -a commands
  local -a subcommands

  if (( CURRENT == 2 )); then
    commands=(
${commands.map((cmd) => `      "${cmd}:${cmd} commands"`).join("\n")}
    )
    _describe 'command' commands
  elif (( CURRENT == 3 )); then
    case "$words[2]" in
${commands
  .map((cmd) => {
    return `      "${cmd}")
        subcommands=(
${subcommands[cmd]
  .map((subcmd) => `          "${subcmd}:${cmd} ${subcmd} command"`)
  .join("\n")}
        )
        _describe 'subcommand' subcommands
        ;;`;
  })
  .join("\n")}
    esac
  fi

  return 0
}

compdef _ber ber
`;
}
