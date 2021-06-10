# Lunch App

### [rojasleon.tech](https://rojasleon.tech/)

**IMPORTANT!** Right now the app does not have the https certificate, so if you see the https error connection, just press: `thisisunsafe` and you'll be able to see the content

Why the name of `rojasleon.tech` as domain?
It's my personal website, I shot it down for a while to point it to the Load Balacer on Digital Ocean.
When the review is down I'll roll out the domain name back to my personal site.
Yeah, you right, I did not want to spend some money 😅.

### Microservice application based on events.

Few notes:

- The `storage service` is not well optimized, you'll see some long-waitings to see the changes. I wrote in a very declarative way to make it just work, I ran out of time...
- Do not pay attention at the `looking` of the website, is not the best I know, It was a quick decision: _Should I write my own css styles? No... Should I use a css framework to do it? Yes, and I pick up semantic ui_. Also yeah, it was a quick desicion.
- Another microservice can be perfectly added, something like a `worker service` to catch some queries, responses, etc.
- HTTPS support could be added
- Many many more improvments can be added to this project.
