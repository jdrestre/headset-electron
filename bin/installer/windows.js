const installer = require('electron-installer-windows');
const path = require('path');

const {
  CERT_PASSWORD, GITHUB_REF_TYPE, GITHUB_REF, GITHUB_REPOSITORY,
} = process.env;

const options = {
  src: 'build/Headset-win32-ia32',
  dest: 'build/installers/',
  productDescription: 'Headset is a desktop app that turns YouTube into a world class music streaming service.'
    + 'Create collections, tune-in to a music subreddit or quickly play that song '
    + 'you’ve had stuck in your head all day!',
  icon: path.join(__dirname, '..', '..', 'src', 'icons', 'headset.ico'),
  noMsi: true,
  tags: ['headset', 'youtube', 'player', 'radio', 'music'],
  iconNuget: path.join(__dirname, '..', '..', 'src', 'icons', 'headset.png'),
};

if (CERT_PASSWORD
  && GITHUB_REPOSITORY === 'headsetapp/headset-electron'
  && (GITHUB_REF_TYPE === 'tag' || GITHUB_REF === 'refs/tags/artifacts')) {
  options.certificateFile = 'sig/win32-headset.pfx';
  options.certificatePassword = CERT_PASSWORD;
} else {
  console.log('Warning: The package will not be signed');
}

async function main() {
  console.log('Creating Windows installer (this may take a while)');
  try {
    await installer(options);
    console.log(`Successfully created installer at ${options.dest}\n`);
  } catch (error) {
    if (CERT_PASSWORD) {
      const passwordRegex = CERT_PASSWORD.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      console.error(error.stack.replace(new RegExp(passwordRegex, 'g'), '***'));
    } else {
      console.error(error.stack);
    }
    process.exit(1);
  }
}
main();
