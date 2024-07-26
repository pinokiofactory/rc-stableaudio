module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/peanutcocktail/RC-stable-audio-tools app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install .",
          "pip install huggingface_hub[hf_transfer]"
        ]
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
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "huggingface-cli download RoyalCities/RC_Infinite_Pianos --local-dir=models/RC_Infinite_Pianos",
        venv: "env",
        env: {
          HF_HUB_ENABLE_HF_TRANSFER: 1
        },
        path: "app"
      }
    }
//    {
//      method: "shell.run",
//      params: {
//        message: "git clone --depth=1 https://huggingface.co/RoyalCities/RC_Infinite_Pianos",
//        path: "app/models"
//      }
//    },
//    {
//      method: "shell.run",
//      params: {
//        message: "git clone --depth=1 https://huggingface.co/cocktailpeanut/oiduaelbats stableaudio",
//        path: "app/models"
//      }
//    }
  ]
}
