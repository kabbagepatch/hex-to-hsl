// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { posix } from 'path';

import { hex2hsl, rgb2hsl, HEX_REGEX, RGB_REGEX } from './colors';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hex-to-hsl" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('hex-to-hsl.replaceActive', async () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello from hex-to-hsl!');
    if (!vscode.workspace.workspaceFolders) {
      return vscode.window.showInformationMessage('No folder or workspace opened');
    }

    if (
      !vscode.window.activeTextEditor
    ) {
      return vscode.window.showInformationMessage('Open a file first');
    }
    
    const replacedDoc = vscode.window.activeTextEditor?.document.getText().replaceAll(HEX_REGEX, hex2hsl).replaceAll(RGB_REGEX, rgb2hsl);
    const writeData = Buffer.from(replacedDoc, 'utf8');
    await vscode.workspace.fs.writeFile(vscode.window.activeTextEditor.document.uri, writeData);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
