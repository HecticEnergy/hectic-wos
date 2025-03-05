## Quick wins

1. Import
   1. Import should merge/update, not overwrite completely
      1. show a diff
   2. Assume 130 is 1:30 (game shows minutes/seconds, assume that's what user is doing)
2. Target Select - make it buttons
3. Output box order by - order by priority (landing time) or launch time?
   1. give the user a control to select
4. Member Notes
   1. Add a notes field to member edit, show on member select/combobox list items
5. upload / export state
   1. ***Waiting for other state changes to be done: Groups***
   2. output the settings / members a json (already mostly in local storage)
   3. upload the settings into the state
   4. Share link with query string?
6. Make Beer icon amber?
7. Title Bar - show bread crumbs?: Hectic WOS > March / Hectic WOS > Ministry
   1. (in `settings-panel` branch)
8. Button tooltips (only useful on desktop ofc) - add title to all controls
9. Menu: March Times screen: open sidebar and collapse rail, switch to Home, still collapsed (as defaulted in this page), then nav back, rail expanded without user action

## Enhancements

1. Settings page
   1. manage groups
   2. manage members
   3. manage deployment groups
      1. requires switching layout for a deployment group layout
   4. Upload / export state
2. Member should be able to create and output their own info
   1. not linked to rally organizer, but copy and paste to chat
   2. OR - send the link (query string) and owner can import
3. [ ] Multi target is just Castle Battle
   1. Load default target names for SFC
      1. Have an option for "What battle are you preparing for?" and make it easy?
      2. Make target names a label and not a combobox
4. Member part of more than one group
   1. groups should have members, not the other way around
5. Deployment Groups
   1. Multiple members/groups to a single target
   2. output for multiple targets
6. SFC
   1. Turrets
      1. a button for each, and a count down for each
      2. the button resets the timer and counts down from 1 minute
      3. coordinate landing time by turret
7. Make member reorder drag and drop
8. Member select
   1. show a screen to touch member names to select them (not dropdown)
      1. touch again to deselect
9. Member specific march offsets
   1. each member should have a customizable offset that will apply based on their order
10. Output box should limit length to 11, then split to a new output box (WOS line limit)
    1. output box takes or makes an array of arrays, figure out max character count for WOS too
11. I18N/Translation - test the page with different localizations/Translations and adjust the layout as needed
12. Error Messages:
    1. Add new member without a target, the error message should dismiss if the window is either closed or saved
    2. Contain within the panel (desktop)

## Server Required

1. post your own march times
   1. link to rally caller with a short unique code
2. notify of ongoing rallies to targets
3. Sync turret occupation notification
4. collaborative members/targets/groups list
5. Mark rallies as successful (rally log)

## Maybe...

1. Calculate 3 other march speeds from 2 other target speeds

## Not Doing

1. Pet Skills
   1. different upgrades... you'd have to add more info
