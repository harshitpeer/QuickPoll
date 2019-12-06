# QuickPoll

This is a super simple, easy to use and install, polling app which you can install on your PHP based server and started receiving opinions from the world.

## Demo

You can checkout a QuickPoll Demo [here](https://harshitpeer.com/blog)

## Install

* Download the Source Code using [this URL](https://github.com/harshitpeer/QuickPoll/archive/master.zip)
* Upload the files on your Web Server
* Edit data.txt and upload your question and responses. First line should be for question and next lines are for responses
* Embed the below code on the website where you want to show the poll

```sh
<script data-url="[YOUR_QUICKPOLL_URL]" id="quickpoll-js" src="[YOUR_QUICKPOLL_URL]/widget.js">
```

Replace `[YOUR_QUICKPOLL_URL]` with the URL where you had installed QuickPoll. For example, if you had installed QuickPoll on https://quickpoll.thehp.tech then your code should look like

```sh
<script data-url="https://quickpoll.domain.com" id="quickpoll-js" src="https://quickpoll.domain.com/widget.js">
```

## Customization

You can customize the color and can enable auto-open feature in QuickPoll. 

### Color

To add your own color use following attribute in your script tag

```sh
data-color="#HEXCOD"
```

Example,

```sh
<script data-url="https://quickpoll.domain.com" data-color="#ED008C" id="quickpoll-js" src="https://quickpoll.domain.com/widget.js">
```

### Auto-Open

To enable auto-open, add following attribute in your script tag

```sh
data-autoopen="true"
```

Example,

```sh
<script data-url="https://quickpoll.domain.com" data-autoopen="true" id="quickpoll-js" src="https://quickpoll.domain.com/widget.js">
```

## Developer

You can get in touch with the developer [here](https://harshitpeer.com)
