## QUICK Fixes!

- [ ] Button tooltips (only useful on desktop ofc)
  - **this is saying add more? I can comb through and add more titles - easy peasy**
- [X] Separate each march not working as expected for Landing Time (Launch Time is working fine). I set all member march times to 1 second, then added a 10 second offset, I would expect that each member arrives 10 seconds later than the previous - might be my misunderstanding
  - **Oof.. high priority**
- [X] Target Name in new user would ideally be dropdown/autocomplete (with manual text input) that offers previously used targets, especially as target names have to match for rallies
  - **Fantastic idea! I should have thought of this!**
- [X] Unable to add new members after completing tour, "Mystic" member - repeatable, will replace the newer member if repeated. Not affected when loading the test data
  - **Test - potentially fix After SVS** *I'm not sure how this is a problem, uses the same add functionality*
  
- [X] Tour: Behaviour for importing "Mystic" player shows confirm model (if tour step previously completed), either incorporate into the tour or handle silently
  - **Clear the tour user after the tour is complete? I figured let them play with it, so maybe clear that one user when the tour starts?**

- [X] Donate button obscure / not recognizable to non-Americans. A splash of colour will also draw attention to this

- [X] Home screen: on first load, sidebar opens by default, should be hidden until opened (possibly base on device screen size)
  - **The idea is to make sure the user realizes there's a menu. though, i could tie it to first visit only... After SvS**

- Make Beer icon amber?

- Title Bar - show bread crumbs: Hectic WOS > March / Hectic WOS > Ministry

## After SvS

- [ ] I18N - test the page with different localizations and adjust the layout as needed
  - **crap - didn't even check i18n.. language localization will mess with layout too :sob:  - Will look closer after SvS**
- [ ] March Times screen: open sidebar and collapse rail, switch to Home, still collapsed (as defaulted in this page), then nav back, rail expanded without user action
  - **fix After SvS**
- [ ] Add new member without a target, the error message should dismiss if the window is either closed or saved
  - **Bigger fix - after SVS**
- [ ] Switching to Landing Time should trigger the target landing time (within the button) on first attempt
  - **I'm not sure how to track this right off hand, I agree it'd be nice, but also, that's the main feature of this type - user picking the landing time**
- [ ] Target Time Edit
  - make target name wider
  - The time component should be just a little bigger than 2 digits

## Enhancements
1. Output box should limit length to 11, then split to a new output box (WOS line limit)
   1. output box takes or makes an array of arrays, figure out max character count for WOS too
2. Output box order by - order by priority (landing time) or launch time?
   1. give the user a control to select
3. Settings page
   1. manage groups
   2. manage members
   3. manage deployment groups (feature request)
      1. requires switching layout for a deployment group layout
   4. import / export state
      1. output the settings / members a json (already mostly in local storage)
      2. import the settings into the state
4. Member Notes
   1. Add a notes field to member edit, show on member select/combobox list items

## Feature Requests
1. Multi target is just Castle Battle
   1. Load default target names for SFC
      1. Have an option for "What battle are you preparing for?" and make it easy?
      2. Make target names a label and not a combobox
2. Member part of more than one group
   1. groups should have members, not the other way around
3. Deployment Groups
   1. Multiple members/groups to a single target
   2. output for multiple targets
4. SFC 
   1. Turrets
      1. a button for each, and a count down for each
      2. the button resets the timer and counts down from 1 minute
      3. coordinate landing time by turret
5. Import
   1. Assume 130 is 1:30 (game shows minutes/seconds, assume that's what user is doing)
6. Edit Member
   1. 1 text box to show minutes/seconds - not 2 separate checkboxes
7. Make member reorder drag and drop
8. Member select
   1. show a screen to touch member names to select them (not dropdown)
      1. touch again to deselect
9.  Member specific march offsets
   1.  each member should have a customizable offset that will apply based on their order
10. Translation!?