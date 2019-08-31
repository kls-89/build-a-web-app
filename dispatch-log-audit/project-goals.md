# Purpose
The purpose of this application is to provide a systematic and easy approach to dispatch call log audits. 

# Current Approach
At present, one supervisor combs through the log every few days and fixes employee errors. Some errors are benign: misspellings, not taking the time to properly format person/location information, etc. Other errors can be much more serious: putting the wrong location of an incident using the wrong call classification reason, etc. The present approach for rectifying the errors is for the supervisor to fix the mistake and then notify the involved employee via email about the changes.

# Why This Doesn't Work
The current approach is slow, puts a tremendous deal of stress on the auditor, and is not generating progress on the parts of the employees. People are unresponsive to too many emails; what's more, by removing the employees from the editing process, they will come to *expect* that the work will be done for them. They're enabled to not put their best efforts into the job. 

# My Approach
I propose a mechanism to streamline this process. First off, rather than reading each log entry, I suggest auditing a *percentage* of log entries between a given time frame. For 911 QA/QI purposes, I'm required to audit 7-10% of medical calls received at our agency. An auditor should be able to enter a range of call numbers, and from that, be presented with a random selection of calls to review.

This can be achieved by entering the starting and ending call numbers for any given time period. For example: 19-1254 19-1337 -> 83 calls. Rounding up, always, to ensure maximum call review, the auditor could select, say:

* 7% - 5.81 (~6 calls)
* 10% - 8.3 (~9 calls)
* 15% - 12.45 (~13 calls)
* 20% - 16.6 (~17 calls)

If the auditor wished to view a random selection of 20% of calls for a given time period, they need only enter the starting/ending call numbers, and select their percentage. Behind the scenes, the application will generate a randomized list of the calls, and auto-generate new audits to be completed.

The auditor can then review the log entry in question, and fill out a form to document the overall success/failure of different aspects of the call. This will perhaps start out as a "PASS/FAIL" checkbox selection for different components of the log entry. Failures would require an explanation.

Examples: 
**Correct Call Reason** : **PASS**
**Complete Narrative** : **FAIL** *Reason: Employee did not write a narrative for this log entry.*

There will be a checkbox to identify each component as a "CRITICAL ERROR" -- These the auditor may fix, but it will be highlighted for the employee's review.

Each audit would be associated with an employee, and the auditor will (at the close of the audit) be able to send email notifications to the employee that a selection of their calls were audited.

#Interface

The employee will have the ability to log into the application and view their individual audits. They will be required to acknowledge the changes.

The auditor (Admin) will be able to log in to view all employee audits, conduct new audits, and make changes to the existing application (e.g. customizing the audit form, user account maintenance, etc).

There will be a separate login account for Supervisors to login to view all employee audits. I'd like for there to be a way to generate charts/graphs/counts for the different employees. This visualization would help supervisors to see if their subordinates are improving over time or not. Those who are not improving will now have a written record of their shortcomings, so that remedial training can be better tailored to their needs. And the same goes for those doing a good job -- those who receive consistently high marks will be revealed to supervisors who can then reach out to these employees to acknowledge their efforts.

# Project Timeline / Tasks
* Create web app scaffolding using Express.
* Set up database (I'll use MongoDB for this project).
* Define Employee and Audit Schemas.
* Protected Routes for Admin access.
* Protected Routes to ensure that each employee can only see their own audits, not others'.
* Charts/Graphs (D3.js? -- I only know this as a buzzword).
* Email integration from the Node app.
* Functionality to allow for randomly selecting calls.
* ...

Today is August 31, 2019. I'd like to see if I can get this up and running by October 31, 2019 (2 months).