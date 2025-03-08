## Terms

- _Fix the code and use these instead_
- Leads - rally callers
- Coordinator - the user organizing the Leads
- Target - the name of the thing you want to attack
  - March Time - how long it takes the rally caller to get to the target
  - ???? - March Time + Rally Time

## Get back to main

1. [x] fix menu
   1. [x] rail looks funny with sub items (icons off)
      1. [x] ~~add dividers and~~ fix padding
   2. [x] March Times screen: open sidebar and collapse rail, switch to Home, still collapsed (as defaulted in this page), then nav back, rail expanded without user action
2. Create yo self
   1. Test everything
3. Draggable members
   1. [x] Add Draggable Component
      1. [x] replace all the draggable imports and use auto importer for everything else
   2. Mouse Up to remove "dragging" opacity isn't working
   3. Test everything
4. **_Fix Tour!!!!_**
5. update HTU's
   1. add more for 
      1. Create yourself / import member link
      2. Member Edit
      3. Main Page 
6. Home Page
   1. [x] update Thank You's
   2. [x] make icon link you to the page (and icon-click event for buy me beer)
   3. [x] add new blocks for recently added pages
   4. [x] pull out item box into it's own HomePageDescription box

## Quick wins

1. !!! **_FIX TOUR_** !!!
2. [x] Make TargetSelect clickable chips (like a radio button)
3. Make Beer icon amber?
4. March Output Box
   1. stop showing it by default
      1. put a copy button on the bottom of the main display instead
      2. show a dialog for a few seconds with the content
   2. fix member select not changing the contents
5. Import
   1. Import should merge/update, not overwrite completely
      1. show a diff
   2. ~~Assume 130 is 1:30 (game shows minutes/seconds, assume that's what user is doing)~~
6. Target Select - make it buttons (instead of dropdown)
7. Member Notes
   1. Add a notes field to member edit, show on member select/combobox list items
8. Title Bar - show bread crumbs?: Hectic WOS > March / Hectic WOS > Ministry
   1. (in `settings-panel` branch)
9. Button tooltips (only useful on desktop ofc) - add title to all controls
10. Add Images from the game to denote SFC targets
11. upload / export state - 5
    1. **_Waiting for other state changes to be done: Groups_**
    2. output the settings / members a json (already mostly in local storage)
    3. upload the settings into the state
    4. Share link with query string?

## Enhancements

1. Settings page
   1. manage groups
   2. manage members
   3. manage deployment groups
      1. requires switching layout for a deployment group layout
   4. Upload / export state
   5. Output box order by - order by priority (landing time) or launch time?
2. [ ] Member should be able to create and output their own info
   1. not linked to rally organizer, but copy and paste to chat
   2. OR - send the link (query string) and owner can import
3. [ ] Multi target is just Castle Battle
   1. Load default target names for SFC
      1. Have an option for "What battle are you preparing for?" and make it easy?
4. Member part of more than one group - 7
   1. groups should have members, not the other way around
   2. split screen - all members (chips) drag/drop to groups
5. Deployment Groups
   1. Multiple members/groups to a single target
   2. output for multiple targets
6. SFC
   1. Turrets
      1. a button for each, and a count down for each
      2. the button resets the timer and counts down from 1 minute
      3. coordinate landing time by turret
7. Member specific march offsets - 0
   1. each member should have a customizable offset that will apply based on their order
8. Output box should limit length to 11, then split to a new output box (WOS line limit)
   1. output box takes or makes an array of arrays, figure out max character count for WOS too
9. I18N/Translation - test the page with different localizations/Translations and adjust the layout as needed
10. Error Messages:
    1. Add new member without a target, the error message should dismiss if the window is either closed or saved
    2. Contain within the panel (desktop)
11. "Battle Prep" Walk Through
    1. show pictures and give them a walk through of how to setup for the battle
    2. check list?
12. Approximate march times based on coordinates and 1 target time?
13. Battle Prep Walkthrough

## Server Required

1. post your own march times
   1. link to rally caller with a short unique code
2. notify of ongoing rallies to targets
3. Sync turret occupation notification
4. collaborative members/targets/groups list
5. Mark rallies as successful (rally log)

6. Mystic
   1. Shared Coordinator Rally Log: [cf queue](https://developers.cloudflare.com/queues/)
      1. This log should record:
         1. Every rally deployed by a coordinator.
         2. The target location and landing time of each rally.
         3. The coordinator who deployed the rally.
         4. Any relevant notes or instructions.
      2. This log should be visible to everyone in the state group, providing a clear, up-to-date overview of all rally activity.
         1. ability to see who's viewing and kick them from view
   2. Flexible Battle Groups with Shareable Codes (State-Wide or Alliance-Only):
      1. We need to create battle groups using shareable codes.
      2. State-Verse-State (SVS) Coordination:
         1. For large-scale, state-wide battles (SVS), we need to be able to share the battle group code with all leaders across the entire "state."
         2. This allows for full, coordinated battles with all state members.
         3. Notify coordinator when someone else directs their rally to start.
      3. Alliance-Only Coordination:
         1. We also need the option to create battle groups for alliance-only coordination.
         2. In this case, the battle group code would only be shared within a specific alliance.
      4. This provides flexibility to coordinate on different scales.
      5. We need to be able to make codes based on events, like a "Sunfire Castle" battle.
   3. Real-Time Rally and Movement Tracking for Battles: (message queue)
      1. Shared Rally List:
         1. This list should be drawn directly from the coordinator rally log.
         2. It should clearly show active and upcoming rallies.
         3. This will prevent multiple alliances from sending troops to the same rally unintentionally.
      2. Movement Tracking:
         1. We need to see who is sending their troops or resources where, and when they'll arrive during a battle.
         2. We also need to see who is directing those troop movements.
         3. For example, we should be able to see:
            1. "Coordinator A" deployed a rally on the "South Turret" (from the rally log).
            2. "South" and "West" are being sent by "Coordinator A" to the "South Turret."
            3. "Jordan" is being sent by "Coordinator B" to the "North Turret."
            4. "Drug bone" is being sent by "Coordinator C" to a location.
         4. This will stop us from accidentally sending our troops to the same place at the same time during the battle and allow coordinators to see their own commands.
   4. Smaller Battle Groups Inside the State/Alliance Group:
      1. Inside our main battle group, we need to be able to make smaller groups for different battle roles or tasks.
      2. For example, we could have groups like "Attack Team," "Defense Team," "Scout Team," or "Resource Team."
      3. Then we can put players into those smaller groups.
      4. Or just sort them by their alliance
   5. Discord Bot
      1. https://discord.com/developers/docs/intro
      2. Notifications
         1. tying "members" to Discord users
         2. Optionally no discord user to manage non discord members

### Dev Details

1. "Join Code"
   1. {StateNumber}[+{AllianceName}]+{8CharRandomCode}
1. Coordinators
   1. Support multiple, should be able to see other's marches (not members)
   2. Switch coordinators (takeover members / targets)

## Maybe...

1. Calculate 3 other march speeds from 2 other target speeds

## Not Doing

1. Pet Skills
   1. different upgrades... you'd have to add more info
