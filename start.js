module.exports = async (kernel) => {
  let env = {}
  if (kernel.platform === 'darwin' && kernel.arch === 'x64') {
    env = {
      PYTORCH_MPS_HIGH_WATERMARK_RATIO: "0.0"
    }
  }
  console.log("env", env)
  return {
    requires: {
      bundle: "ai",
    },
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          venv: "env",
          env: env,
          path: "app",
          message: [
            "python run_gradio.py"
          ],
          on: [{
            "event": "/http:\/\/\\S+/",
            "done": true
          }]
        }
      },
      {
        method: "local.set",
        params: {
          url: "{{input.event[0]}}"
        }
      },
    ]
  }
}
