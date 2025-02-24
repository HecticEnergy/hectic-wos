<template>
  <p>
    The <b>"March Time"</b> tab is where the magic happens. Once you have
    members imported, you'll spend most of your time here.
  </p>
  <br>
  <h5>Select Group</h5>
  <p>
    If you have groups on members set, select the group of members you want to
    view. The members in the group will be displayed in the output box.
  </p>
  <p>
    <b><i>NOTICE</i></b> when selecting a group, the checkbox on the members tab
    is ignored.
  </p>
  <br>
  <h5>Select Target</h5>
  <p>
    You select the target, and the tool will display the march times for each
    member. The times are displayed in UTC time, with any offset applied.
  </p>
  <br>
  <p>
    Use <b>"Rally Time"</b> to specify how long of a rally your rally callers
    will be holding. This will be deducted from the Target Landing Time.
  </p>
  <br>
  <p>
    <b>"Offset Rallies by Seconds"</b> is used to add a delay between each
    march. Instead of attempting to have all marches arrive at the target at the
    same time, you can have them land at different times based on their order.
    In this view, the offset will be deducted from the Target Landing Time.
    (They will leave a little earlier.)
  </p>
  <br>
  <p>
    <b>"Ignore Seconds"</b> will round the time up to the next minute. The offset  
    is displayed on the screen for convenience.
  </p>
  <br>
  <p>
    <b>"Target Landing Time"</b> is the time you want your members to land at
    the target. The march times will be calculated backwards from the landing time.
  </p>
  <br>
  <p>
    The "Copy" button will select the text in the output box, so you can copy it
    and paste it into your chat.
  </p>
</template>

<script setup lang="ts">
//
</script>
