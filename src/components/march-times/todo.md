## QUICK Fixes!

- [ ] Button tooltips (only useful on desktop ofc)
  - **this is saying add more? I can comb through and add more titles - easy peasy**
- [x] Separate each march not working as expected for Landing Time (Launch Time is working fine). I set all member march times to 1 second, then added a 10 second offset, I would expect that each member arrives 10 seconds later than the previous - might be my misunderstanding
  - **Oof.. high priority**
- [x] Target Name in new user would ideally be dropdown/autocomplete (with manual text input) that offers previously used targets, especially as target names have to match for rallies
  - **Fantastic idea! I should have thought of this!**
- [x] Unable to add new members after completing tour, "Mystic" member - repeatable, will replace the newer member if repeated. Not affected when loading the test data
  - **Test - potentially fix After SVS** _I'm not sure how this is a problem, uses the same add functionality_
- [x] Tour: Behaviour for importing "Mystic" player shows confirm model (if tour step previously completed), either incorporate into the tour or handle silently

  - **Clear the tour user after the tour is complete? I figured let them play with it, so maybe clear that one user when the tour starts?**

- [x] Donate button obscure / not recognizable to non-Americans. A splash of colour will also draw attention to this

- [x] Home screen: on first load, sidebar opens by default, should be hidden until opened (possibly base on device screen size)

  - **The idea is to make sure the user realizes there's a menu. though, i could tie it to first visit only... After SvS**

- Make Beer icon amber?

- Title Bar - show bread crumbs: Hectic WOS > March / Hectic WOS > Ministry

## After SvS

- [ ] I18N - test the page with different localizations and adjust the layout as needed
  - **crap - didn't even check i18n.. language localization will mess with layout too :sob: - Will look closer after SvS**
- [ ] March Times screen: open sidebar and collapse rail, switch to Home, still collapsed (as defaulted in this page), then nav back, rail expanded without user action
  - **fix After SvS**
- [ ] Add new member without a target, the error message should dismiss if the window is either closed or saved
  - **Bigger fix - after SVS**
- [ ] Switching to Landing Time should trigger the target landing time (within the button) on first attempt
  - **I'm not sure how to track this right off hand, I agree it'd be nice, but also, that's the main feature of this type - user picking the landing time**
- [ ] Target Time Edit
  - make target name wider
  - The time component should be just a little bigger than 2 digits

## Quick wins

1. Import
   1. Import should merge/update, not overwrite completely
      1. show a diff
   2. Assume 130 is 1:30 (game shows minutes/seconds, assume that's what user is doing)
2. Output box order by - order by priority (landing time) or launch time?
   1. give the user a control to select
3. Member Notes
   1. Add a notes field to member edit, show on member select/combobox list items
4. upload / export state
   1. output the settings / members a json (already mostly in local storage)
   2. upload the settings into the state
   3. Share link with query string?
5. Edit Member
   1. 1 text box to show minutes/seconds - not 2 separate checkboxes

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
3. Multi target is just Castle Battle
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
11. Translation!?

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