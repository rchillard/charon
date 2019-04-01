# Charon
Charon is the ferryman to the underworld in Greek mythology.  It's also a simple webpage that displays a different state depending on the status of a VPN server.  If the VPN server is online, it displays an image.  If the VPN server is offline, and you need use of it, then it allows you to send a simple request to launch the server.

![Painting of Kharon crossing the river Styx](webpage/assets/1200px-Lytovchenko_Olexandr_Kharon.jpg "Kharon by Olexandr Lytovchenko")

## That sounds kinda silly.  Why do this?
I have a group of friends that wanted access to a VPN server, but they were unsure about setting one up or buying a VPN service.  This provides a way for them to use a shared VPS on a cloud hosting provider (very affordable) without incurring large costs and without needing to have access to the cloud hosting provider directly.

# Technology
The VPN server is Streisand: https://github.com/StreisandEffect/streisand
The VPN client can be whatever you like, as Streisand can serve a large number of solutions.
The function for processing the request is written in Node, so any Function-as-a-Service offering should run it.
The webpage is simple HTML/CSS/JavaScript.

# Cost
My example is running on a small AWS instance that costs ~$5/month, if it runs all the time.  Since it's setup to shutdown when no one is connected, this normally costs <$1-2/month.
