# Download and Install Compass

MongoDB Compass doesn't support virtual desktop environments.

You can connect to your [MongoDB Atlas](https://www.mongodb.com/docs/atlas) deployment with MongoDB Compass. MongoDB Atlas is the fully managed service for MongoDB deployments in the cloud.

To download and install MongoDB Compass, select your operating system:

## Software Requirements

- 64-bit version of macOS 11 or later.

- MongoDB 7.0 or later.

Compass requires:

- 64-bit version of Microsoft Windows 10 or later.

- MongoDB 7.0 or later.

- [Microsoft .NET Framework version 4.5 or later](https://www.microsoft.com/en-us/download/details.aspx?id=30653).

  The Compass installer prompts you to install the minimum required version of the .NET framework if it is not already installed on your system.

- installation using Microsoft PowerShell or installing on Azure Virtual Desktop Infrastructure (VDI).

## Download Compass

To download Compass, you can use your preferred web browser.

1. Open the [downloads page](https://www.mongodb.com/try/download/compass).

2. Select the installer you prefer. The MongoDB Compass installer is available as a `.exe` or `.msi` package or a `.zip` archive.

3. Download the latest version of MongoDB Compass for Windows.

## Install Compass

1. Double-click the installer file.

2. Follow the prompts to install Compass. You can select the destination of the Compass installation.

3. Once installed, Compass launches and prompts you to configure privacy settings and specify update preferences.

## Software Requirements

Compass requires:

- 64-bit version of macOS 10.12 or later.

- MongoDB 7.0 or later.

Compass supports x64 and ARM64 architectures.

- M1 Silicon is a supported ARM64 architecture and has a separate binary in the download center.

Compass supports x64 and ARM64 architectures.

## Download Compass

To download Compass, you can use your preferred web browser.

1. Open the [downloads page](https://www.mongodb.com/try/download/compass).

2. Download the latest version of MongoDB Compass for macOS. The MongoDB Compass installer is a `.dmg` disk image.

## Install Compass

1. Once you have downloaded Compass, double-click on the `.dmg` file to open the disk image within the macOS Finder.

2. Drag the MongoDB Compass application to your Applications folder.

3. Eject the disk image.

4. From the Applications folder, double-click on the Compass icon to start the application.

5. When you open MongoDB Compass for the first time, you may receive a notice stating that it is an application downloaded from the internet, requiring you to confirm you want to open it. Click Open to continue and launch Compass.

Depending on your system's security settings, you may have to modify your system settings to grant Compass permissions to run. You may be prompted to enter your system password before launching Compass.

When you run MongoDB Compass on Linux machines using Nvidia graphics cards, MongoDB Compass may not render correctly. If an error returns, try including the `--disable-gpu` flag when you run the application.

## Software Requirements

Compass requires:

- 64-bit version of RHEL 8+ or later.

- MongoDB 7.0 or later.

## Download and Install Compass

1. Download MongoDB Compass.

   ```shell
   wget https://downloads.mongodb.com/compass/mongodb-compass-1.46.10.x86_64.rpm
   ```

2. Install MongoDB Compass.

   ```shell
   sudo yum install mongodb-compass-1.46.10.x86_64.rpm
   ```

3. Start MongoDB Compass.

   ```sh
   mongodb-compass
   ```

When you run MongoDB Compass on Linux machines using Nvidia graphics cards, MongoDB Compass may not render correctly. If an error returns, try including the `--disable-gpu` flag when you run the application.

## Software Requirements

Compass requires:

- 64-bit version of Ubuntu 20.04 or later.

- MongoDB 7.0 or later.

## Download and Install Compass

To download Compass on Linux systems, use `wget`.

Alternatively, you can download Compass from the MongoDB [downloads page](https://www.mongodb.com/try/download/compass).

1. Download MongoDB Compass.

   ```shell
   wget https://downloads.mongodb.com/compass/mongodb-compass_1.46.10_amd64.deb
   ```

2. Install MongoDB Compass.

   ```shell
   sudo apt install ./mongodb-compass_1.46.10_amd64.deb
   ```

   If your Linux distribution does not support using `apt` for installing local `.deb` files, run the following lines to install MongoDB Compass:

   ```shell
   sudo dpkg -i mongodb-compass_1.46.10_amd64.deb
   sudo apt-get install -f # This installs required compass dependencies
   ```

3. Start MongoDB Compass.

   ```sh
   mongodb-compass
   ```

- [Update MongoDB Compass](https://mongodbcom-cdn.staging.corp.mongodb.com/docs/compass/upgrade/#std-label-upgrade-compass)

- [Capabilities of Compass Editions](https://mongodbcom-cdn.staging.corp.mongodb.com/docs/compass/editions/#std-label-compass-feature-table)

