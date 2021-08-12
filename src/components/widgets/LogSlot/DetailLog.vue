<template>
  <span>
    <slot  name="REPORT_NOT_VALIDATED"   v-if="logDescription=='REPORT_NOT_VALIDATED'" :log="JSON.parse(log)"></slot>
    <slot  name="NOT_VALIDATED_YET"   v-if="logDescription=='NOT_VALIDATED_YET'" :log="JSON.parse(log)"></slot>
    <slot  name="VALIDATE"   v-if="logDescription=='VALIDATE'" :log="JSON.parse(log)"></slot>
    <slot  name="EDIT_REPORT"   v-if="logDescription=='EDIT_REPORT'" :log="JSON.parse(log)"></slot>
    <slot  name="EDIT_NOTE"   v-if="logDescription=='EDIT_NOTE'" :log="JSON.parse(log)"></slot>
    <slot  name="SEND_EMAIL"   v-if="logDescription=='SEND_EMAIL'" :log="JSON.parse(log.replace(/\\/g,''))"></slot>
    <slot  name="SEND_WHATSAPP"   v-if="logDescription=='SEND_WHATSAPP'" :log="JSON.parse(log.replace(/\\/g,''))"></slot> 
  </span>
</template>

<script>
export  default {
  props: {
    log: [Object,String],
    logDescription: String
  },

  data: () => ({
    parsedLog:'' 
  })
}
</script>
