import { computed } from 'vue'
import { marked } from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/foundation.css'

export const useMarkdown2HTML = (markdown: string) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code) => highlight.highlightAuto(code).value
  })

  const markdownToHtml = computed(() => {
    return marked(markdown)
  })

  return markdownToHtml.value
}
