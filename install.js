module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/RoyalCities/RC-stable-audio-tools app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install .",
          "uv pip install gradio==5.50.0"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true
        }
      }
    },
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "shell.run",
      params: {
        path: "app",
        conda: "conda_env",
        message: "conda install -y -c conda-forge libsndfile",
      }
    },
    // libsndfile.dylib handling
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "fs.copy",
      params: {
        src: "{{path.resolve(cwd, 'app/conda_env/lib/libsndfile.dylib')}}",
        dest: "{{path.resolve(cwd, 'app/env/lib/python3.10/site-packages/_soundfile_data/libsndfile.dylib')}}",
      }
    }
  ]
}
