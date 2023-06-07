import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

// keeps a reference to the language client to allow gracefull stopping.
let client: LanguageClient;

// This function is called when the extension is activated. This can be because a document with
// the language is opened or if a command is run.
export async function activate() {
  // server options configure how we initialize the server process
  let serverOptions: ServerOptions = {
    command: "go run github.com/crewlinker/gx lsp",
  };

  // client options configure how the client language client behaves
  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "gx" }],
  };

  // initialize the language client
  client = new LanguageClient(
    "gxLanguageServer",
    "Gx Language Server",
    serverOptions,
    clientOptions
  );

  // try to start the client or log any error
  try {
    await client.start();
  } catch (e) {
    console.error("failed to stop lsp client:", e);
  }

  console.log("started 'gx' language client");
}

// This function is called when your extension is deactivated
export async function deactivate() {
  if (!client) {
    return; // no client to stop
  }

  // try to stop the language client
  try {
    await client.stop();
  } catch (e) {
    console.error("failed to stop language client:", e);
  }

  console.log("stopped 'gx' language client");
}
