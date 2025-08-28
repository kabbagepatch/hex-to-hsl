import * as vscode from 'vscode';

import { hex2hsl, rgb2hsl, hslToHex, HEX_REGEX, RGB_REGEX, HSL_REGEX } from './colors';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "hex-to-hsl" is now active!');

  const replaceInActiveWindow = async (replaceMaps : { regex : RegExp, replaceFunction : any }[]) => {
    vscode.window.showInformationMessage('Hello from hex-to-hsl!');
    if (!vscode.workspace.workspaceFolders) {
      return vscode.window.showInformationMessage('No folder or workspace opened');
    }

    if (!vscode.window.activeTextEditor) {
      return vscode.window.showInformationMessage('Open a file first');
    }

    const fileContent = vscode.window.activeTextEditor?.document.getText();

    const combinedRegex = new RegExp(replaceMaps.map(replaceMap => replaceMap.regex.source).join('|'));
    if (!fileContent.match(combinedRegex)) {
      return;
    }

    let replacedDoc = vscode.window.activeTextEditor?.document.getText();
    replaceMaps.forEach(replaceMap => {
      replacedDoc = replacedDoc.replaceAll(replaceMap.regex, replaceMap.replaceFunction);
    });

    const writeData = Buffer.from(replacedDoc, 'utf8');
    await vscode.workspace.fs.writeFile(vscode.window.activeTextEditor.document.uri, writeData);
  };

  const all2hslActive = vscode.commands.registerCommand('hex-to-hsl.all-to-hslActive', async () => {
    await replaceInActiveWindow([{ regex: HEX_REGEX, replaceFunction: hex2hsl }, { regex: RGB_REGEX, replaceFunction: rgb2hsl }]);
  });

  const hex2hslActive = vscode.commands.registerCommand('hex-to-hsl.hex-to-hslActive', async () => {
    await replaceInActiveWindow([{ regex: HEX_REGEX, replaceFunction: hex2hsl }]);
  });

  const rgb2hslActive = vscode.commands.registerCommand('hex-to-hsl.rgb-to-hslActive', async () => {
    await replaceInActiveWindow([{ regex: RGB_REGEX, replaceFunction: rgb2hsl }]);
  });

  const hsl2hexActive = vscode.commands.registerCommand('hex-to-hsl.hsl-to-hexActive', async () => {
    await replaceInActiveWindow([{ regex: HSL_REGEX, replaceFunction: hslToHex }]);
  });

  const replaceInWorkspace = async (replaceMaps : { regex : RegExp, replaceFunction : any }[]) => {
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
      let fileContent = (await vscode.workspace.fs.readFile(fileUri)).toString();

      const combinedRegex = new RegExp(replaceMaps.map(replaceMap => replaceMap.regex.source).join('|'));
      if (!fileContent.match(combinedRegex)) {
        continue;
      }

      outputChannel.appendLine(file);

      replaceMaps.forEach(replaceMap => {
        fileContent = fileContent.replaceAll(replaceMap.regex, replaceMap.replaceFunction);
      });
      const writeData = Buffer.from(fileContent, 'utf8');
      await vscode.workspace.fs.writeFile(fileUri, writeData);
    }
  };

  const all2hslWorkspace = vscode.commands.registerCommand('hex-to-hsl.all-to-hslWorkspace', async () => {
    await replaceInWorkspace([{ regex: HEX_REGEX, replaceFunction: hex2hsl }, { regex: RGB_REGEX, replaceFunction: rgb2hsl }]);
  });

  const hex2hslWorkspace = vscode.commands.registerCommand('hex-to-hsl.hex-to-hslWorkspace', async () => {
    await replaceInWorkspace([{ regex: HEX_REGEX, replaceFunction: hex2hsl }]);
  });

  const rgb2hslWorkspace = vscode.commands.registerCommand('hex-to-hsl.rgb-to-hslWorkspace', async () => {
    await replaceInWorkspace([{ regex: RGB_REGEX, replaceFunction: rgb2hsl }]);
  });

  const hsl2hexWorkspace = vscode.commands.registerCommand('hex-to-hsl.hsl-to-hexWorkspace', async () => {
    await replaceInWorkspace([{ regex: HSL_REGEX, replaceFunction: hslToHex }]);
  });

  context.subscriptions.push(all2hslActive);
  context.subscriptions.push(hex2hslActive);
  context.subscriptions.push(rgb2hslActive);
  context.subscriptions.push(hsl2hexActive);
  context.subscriptions.push(all2hslWorkspace);
  context.subscriptions.push(hex2hslWorkspace);
  context.subscriptions.push(rgb2hslWorkspace);
  context.subscriptions.push(hsl2hexWorkspace);
}

export function deactivate() {}
