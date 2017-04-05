# MinutesToSlack
Are you usually the one responsible for taking minutes? Getting a little tired of the reptition, for example, having to recreate the document template(s) after every meeting? Do you also have the responsibility to upload those minutes to a Slack channel? Fear no more. MinutesToSlack aims to allow users to enter meeting minutes (and other details) which can be generated into a PDF format, andalso have the ability to upload the file to a Slack channel. The best thing? It's all in a simple web interface.
<br />
<br />
Users can enter in details such as Company name, meeting venues, dates, times, participants, apologies, and the main content such as general items, actions, etc. All of this information is in a simple form, and there are also buttons that users can click on for certain functions such as getting the current date. Users also have the option to take live minutes, there is an option to start and end meetings - Javascript will work out the time taken for the meeting and set the times as appropriate. Using the jsPDF library, uses can save their form inputs as a PDF file.
<br/><br/>
After discovering Slack's file.upload API, the simple form POST method was implemented so that users can upload files to their slack channels. (Note: in order to do so, you need to generate a token for yourself or a bot - please read the Slack API; listed below)
<br />
<br />
***Using Minute To Slack***<br/>
Minutes<br/>
<img src="http://i.imgur.com/DdPcbdU.png"/>
<br/><br/>
Uploading to Slack<br/>
<img src="http://i.imgur.com/tfrL4O5.png"/>
<br/><br/>
If you would like to demo this interface, feel free to clone this repository (you will be missing some resources - simple images), or you can demo it on my site at: <a>http://www.xuansonon.com/projects/minutestoslack</a>.
<br/><br/>

***Still to do***
- [ ] Instead of saving file and then re-uploading, find a way to automate.
- [ ] Create more themes (This decision is harder because jsPDF will not automatically go to new page - restrict number of Items)

***See also***<br/>
jsPDF Library - <a>https://github.com/MrRio/jsPDF</a><br/>
Slack files.upload API - <a>https://api.slack.com/methods/files.upload</a><br/>
Slack's Bot Integration - <a>https://api.slack.com/bot-users</a><br/>
Slack token generator - <a>https://api.slack.com/custom-integrations/legacy-tokens</a><br/>
<br/>
***Final Notes***<br/>
jsPDF, by default, saves documents in A4 format. So if you would like a different size, please change as desired in the source code (minutes.js). Also, an example PDF has been upload for those who are curious to see what the generated document looks like.
