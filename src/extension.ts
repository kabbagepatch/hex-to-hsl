import * as vscode from 'vscode';

import { hex2hsl, rgb2hsl, HEX_REGEX, RGB_REGEX } from './colors';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "hex-to-hsl" is now active!');

  let replaceActive = vscode.commands.registerCommand('hex-to-hsl.replaceActive', async () => {
    vscode.window.showInformationMessage('Hello from hex-to-hsl!');
    if (!vscode.workspace.workspaceFolders) {
      return vscode.window.showInformationMessage('No folder or workspace opened');
    }

    if (!vscode.window.activeTextEditor) {
      return vscode.window.showInformationMessage('Open a file first');
    }

    const fileContent = vscode.window.activeTextEditor?.document.getText();

    const hexRegex = new RegExp(HEX_REGEX);
    const rgbRegex = new RegExp(RGB_REGEX);
    const combinedRegex = new RegExp(hexRegex.source + "|" + rgbRegex.source);
    if (!fileContent.match(combinedRegex)) {
      return;
    }

    const replacedDoc = vscode.window.activeTextEditor?.document.getText().replaceAll(HEX_REGEX, hex2hsl).replaceAll(RGB_REGEX, rgb2hsl);
    const writeData = Buffer.from(replacedDoc, 'utf8');
    await vscode.workspace.fs.writeFile(vscode.window.activeTextEditor.document.uri, writeData);
  });

  let replaceAllInWorkspace = vscode.commands.registerCommand('hex-to-hsl.replaceAllInWorkspace', async () => {
    vscode.window.showInformationMessage('Hello from hex-to-hsl!');
    if (!vscode.workspace.workspaceFolders) {
      return vscode.window.showInformationMessage('No folder or workspace opened');
    }

    const files = await vscode.workspace.findFiles('**/src/**/*.{ts,js,css,vue,jsx}', '{node_modules,**/node_modules}');
    const filePaths = files.map(file => file.path);

    const outputChannel = vscode.window.createOutputChannel('hex-to-hsl');
    outputChannel.show();
    outputChannel.appendLine(`Replaced colours in the following files:`);

    for (const file of filePaths) {
      const fileUri = vscode.Uri.file(file);
      const fileContent = (await vscode.workspace.fs.readFile(fileUri)).toString();

      const hexRegex = new RegExp(HEX_REGEX);
      const rgbRegex = new RegExp(RGB_REGEX);
      const combinedRegex = new RegExp(hexRegex.source + "|" + rgbRegex.source);
      if (!fileContent.match(combinedRegex)) {
        continue;
      }

      outputChannel.appendLine(file);

      const replacedDoc = fileContent.replaceAll(HEX_REGEX, hex2hsl).replaceAll(RGB_REGEX, rgb2hsl);
      const writeData = Buffer.from(replacedDoc, 'utf8');
      await vscode.workspace.fs.writeFile(fileUri, writeData);
    }
  });

  context.subscriptions.push(replaceActive);
  context.subscriptions.push(replaceAllInWorkspace);
}

export function deactivate() {}
