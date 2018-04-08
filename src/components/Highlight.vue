<script>
  import t from 'vue-types';
  import {escape, escapeRegExp} from 'lodash-es';

  export default {
    props: {
      text: t.string.isRequired,
      q: t.string
    },
    computed: {
      html() {
        const {text, q} = this;
        let html;

        const re = (q instanceof RegExp) ? q : new RegExp(`(?:${escapeRegExp(q)})+`, 'i');
        const match = re.exec(text);
        if (match) {
          html = (
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
    },

    render() {
      if (this.q) {
        return <span domPropsInnerHTML={this.html}/>;
      } else {
        return <span>{this.text}</span>;
      }
    }
  };
</script>

<style>
  .highlight {
    text-decoration: underline;
  }
</style>
