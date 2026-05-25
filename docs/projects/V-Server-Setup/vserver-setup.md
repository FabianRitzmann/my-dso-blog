# V-Server Setup

his document explains how to set up and access a virtual server (V-Server) using SSH and how to configure and install a web server (Nginx).

---

# Table of Contents

1. [SSH Access to the Server](#ssh-access-to-the-server)  
2. [Add SSH Public Key to Server](#add-ssh-public-key-to-server)  
3. [Disable Password Authentication](#disable-password-authentication)  
4. [Create SSH Alias](#create-ssh-alias)  
5. [Install Nginx Web Server](#install-nginx-web-server)  
6. [Configure Nginx Website](#configure-nginx-website)  
7. [Configure Git on the Server](#configure-git-on-the-server)  
8. [Create SSH Key for GitHub](#create-ssh-key-for-github)  
9. [Add SSH Key to GitHub](#add-ssh-key-to-github)

---

##  Explanation of a V-Server 
First of all, what is a V-Server? A V-Server is a virtual server that runs as a virtual machine on physical hardware. It allows you to run programs and host services on it. In other words, a V-Server is not a physical server that you can touch. Instead, it is created through virtualization on a real machine and shares its resources with other virtual servers.

##  Step by step setup of a V-Server 

### 1. Create an SSH key pair

First, generate an SSH key pair on your local machine. This key will be used for secure authentication.

 ```
   $ ssh-keygen -t ed25519
   ```
  You will be asked where to save the key. You can either press Enter to accept the default location or specify a custom path.

   - To view the contents of the directory: `ls`
     
   - To display the public key: `cat` 

### 2. Connect to the V-Server via SSH

Next, connect to your server using SSH. The first login is usually done with a username and password provided by your hoster.

 ```
   $ ssh username@server-ip
   ```
After entering the command, you will be prompted to enter your password.

### 3. Add your public key to the server

To enable passwordless login, copy your public key to the server:

You can use `ssh-copy-id`: 
 ```
   $ ssh-copy-id -i ~/.ssh/demo_ed225519.pub username@server-ip
   ```
If this does not work, you can use the manual method:

 ```
   $ type $HOME\.ssh\demo_ed225519.pub | ssh username@server-ip "cat >> .ssh/authorized_keys"
   ```

Confirm the prompt by entering your password. This will copy the public key to the server. Afterwards, test the connection.
 ```
   $ ssh -i  $HOME\.ssh\demo_ed225519 username@server-ip 
   ```

To verify that the key was added successfully, you can check:
 ```
   $ cat ~/.ssh/authorized_keys
   ```

### 4. Disable password authentication

For better security, you can disable password login so that only SSH key authentication is allowed.

 🚨 Make sure your SSH key login works before disabling password authentication, otherwise you may lock yourself out.
    
Open the SSH daemon configuration file: `sudo nano /etc/ssh/sshd_config`

Find the following line: `#PasswordAuthentication yes` and change it to: `#PasswordAuthentication no`

Restart the SSH service to apply the changes: `sudo systemctl restart ssh.service`

### 5. Create an alias for easier access

To simplify logging in, you can create an alias or function in your shell configuration file.

The alias command itself does not provide help options, but you can access documentation via man alias, which can be useful for further reference.

Bash (Linux/macOS)

To create a simple alias in Bash, you can use:

 ```
   $ alias name=""
   ```

PowerShell (Windows)

In PowerShell, Bash-style aliases like the following do not work.

Instead, you should use a function.

Create a function in PowerShell:

```
   $ function v_server_connect {ssh -o StrictHostKeyChecking=no -i $HOME\.ssh\demo_ed225519 username@server-ip}
   ``` 

Then you can connect to the server simply by running: `v_server_connect`


---

## Install Nginx Web Server

Nginx is a lightweight and fast web server used to host websites and applications.


### 1. Update package list and install Nginx

```
sudo apt update
sudo apt install nginx -y
```
### 2. Check Nginx status
To verify whether Nginx is running, use the following command: `systemctl status nginx.service`

If Nginx is running correctly, you will see a status like: `active (running)`

### Configuring Nginx

The default Nginx page should be replaced with a custom HTML page. To do this, create a new website configuration and restart Nginx.

1. Create a directory for the alternative website
```
sudo mkdir /var/www/alternatives
```
Check if the directory exists:`ls /var/www/`

2. Create an HTML file
```
sudo nano /var/www/alternatives/main.html
```
Customizing Main.html:
```
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Alternative Nginx Seite</title>
</head>
<body>
    <h1>Alternative Nginx Startseite</h1>
    <p>Diese Seite wird über eine eigene Nginx-Konfiguration geladen.</p>

</body>
</html>
```

3. Create a configuration file
```
sudo nano /etc/nginx/sites-enabled/alternatives
```

Insert the following content:
```
server {
    listen 80;
    server_name _;

    root /var/www/alternatives;
    index alternate-index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
## Configuring Git on the V-server (Name & Email)

```
git config --global user.name "Fabian Ritzmann"
git config --global user.email "email@example.com" 
```
## Create an SSH key on the server
Generate an SSH key pair on your server. This key will be used later to securely connect to GitHub.
```
ssh-keygen -t ed25519
```
## View SSH key
```
cat ~/.ssh/github_server.pub
```

## Add Key to GitHub

1. [Open GitHub:](https://github.com/)

2. Go to:
  - Settings → SSH and GPG keys 

3. Click: `New SSH Key`

4. Then fill in:

- Title: "V-Server"
- Key: paste the full content of your `github_server.pub` file

5. Click: `Save`


## Summary

This repository provides a complete step-by-step guide for setting up a V-Server.

It includes:

- Initial SSH access to the server
- Setting up SSH key authentication for secure login
- Disabling password authentication to improve security
- Creating a convenient SSH alias for faster access
- Installing and configuring the Nginx web server
- Setting up a custom website with Nginx
- Configuring Git on the server
- Generating and adding an SSH key for GitHub integration

