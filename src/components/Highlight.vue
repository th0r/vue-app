<template>
  <span>
    <span v-if="q" v-html="html"></span>
    <template v-else>{{ text }}</template>
  </span>
</template>

<script>
  import {escape, escapeRegExp} from 'lodash-es';

  export default {
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

        const re = (q instanceof RegExp) ? q : new RegExp(`(?:${escapeRegExp(q)})+`, 'i');
        const match = re.exec(text);
        if (match) {
          html = (
            // tslint:disable-next-line: prefer-template
            escape(text.slice(0, match.index)) +
            `<span class="highlight">${escape(match[0])}</span>` +
            escape(text.slice(match.index + match[0].length))
          );
        }

        if (!html) {
          html = escape(text);
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
