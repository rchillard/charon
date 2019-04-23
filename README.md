# Charon
Charon is the ferryman to the underworld in Greek mythology.  It's also a simple website that displays a different state depending on the status of a VPN server.  If the VPN server is online, it displays an image.  If the VPN server is offline, and you need use of it, then it allows you to send a simple request to launch the server, assuming you know the magic word.

## That sounds kinda silly.  Why do this?
I have a group of friends that wanted access to a VPN server, but they were unsure about setting one up or buying a VPN service.  This provides a way for them to use a shared VPS on a cloud hosting provider (very affordable) without incurring large costs and without needing to have access to the cloud hosting provider directly.

![Painting of Kharon crossing the river Styx](assets/1200px-Lytovchenko_Olexandr_Kharon.jpg "Kharon by Olexandr Lytovchenko")

## Technology
- VPN server: Streisand, https://github.com/StreisandEffect/streisand
- VPN client: Whatever you like, but I recommend Wireguard, https://www.wireguard.com/
- Website: HTML/CSS/Vanilla JS
- Backend: NodeJS function, deployed using Serverless framework, running in Lambda on AWS, using API Gateway

You can host the website anywhere you like, as it's simple HTML/CSS/JavaScript.  The backend function for processing the request is written in Node, so any Function-as-a-Service offering should run it.

## Cost
My example is running on a small (t2.micro) AWS instance that costs ~$5/month, if it runs all the time.  Since it's setup to shutdown when no one is connected, this normally costs <$1-5/month, which is comparable to most commercial VPN services. 

Here's a sample of my real costs over 4 months:
| Month | 1   | 2   | 3   | 4   |
| Cost  | $   | $   | $   | $   |

# Setup
These are general setup instructions.  I may revisit this project to automate these things later:
1. Install Streisand following their directions on your chosen cloud provider
2. In my AWS example, I used CloudWatch alarms to define a rule to automatically shutdown the server if there was no network traffic in 15m.  As a note, if you're using AWS, you should also delete the Elastic IP that was assigned to you, as you will:
- Not need it, because Charon will retrieve the IP of the running server and display it
- AWS will bill you for reserving an Elastic IP but _not_ using it.  Remember your VPN server will be mostly offline
3. Deploy the backend function to a Function-as-a-Service offering, exposing it as a simple HTTP endpoint
4. Update your Charon frontend (index.js) file with the HTTP endpoint

## Security
One thing to note is that Charon requires a publicly available HTTP endpoint that's going to be used to activate your backend function.  This endpoint will be available to anyone with basic development tools, as it's going to live on the client.  As a result, you should severely rate limit this endpoint, so bad actors can't run up your bill.
