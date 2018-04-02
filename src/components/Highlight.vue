<template>
  <span>
    <span v-if="q" v-html="html"></span>
    <template v-else>{{ text }}</template>
  </span>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'Highlight',
    props: {
      text: {
        type: String,
        required: true
      },
      q: {
        type: String,
        required: true
      }
    },
    computed: {
      html() {
        const {text, q} = this;
        let html;

        const re = (q instanceof RegExp) ? q : new RegExp(`(?:${_.escapeRegExp(q)})+`, 'i');
        const match = re.exec(text);
        if (match) {
          html = (
            // tslint:disable-next-line: prefer-template
            _.escape(text.slice(0, match.index)) +
            `<span class="highlight">${_.escape(match[0])}</span>` +
            _.escape(text.slice(match.index + match[0].length))
          );
        }

        if (!html) {
          html = _.escape(text);
        }

        return html;
      }
    }
  };
</script>

<style>
  .highlight {
    text-decoration: underline;
  }
</style>
