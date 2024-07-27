module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "app/env",                // Edit this to customize the venv folder path
        message: [
          "huggingfs hfs.json"
        ],
      }
    }
  ]
}
