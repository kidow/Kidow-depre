import Vue from 'vue'
import cheerio from 'cheerio'

export default (ctx, inject) => {
  const titleUrl = (title, alias) => {
    if (!title) return alias
    let result = title
      .replace(/[&\\/\\#,+()$~%!.'";:*`’“?<>{}]/g, '')
      .trim()
      .replace(/ |\xA0/g, '-')
    if (alias) result += `-${alias}`
    return result
  }
  const sliceParams = paramsId =>
    paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
  const extract = html => {
    const $ = cheerio.load(html)

    let text = $.text() ? $.text().trim() : ''
    const pretext = text.substring(0, 140) || ''
    const thumbnailUrl = $('img').attr('src') || ''

    return {
      text,
      pretext,
      thumbnailUrl
    }
  }

  inject('titleUrl', titleUrl)
  inject('sliceParams', sliceParams)
  inject('cheerio', extract)
}
