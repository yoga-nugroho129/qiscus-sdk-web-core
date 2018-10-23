import test from 'ava'
import Comment from '../lib/comment'

test.beforeEach(t => {
  t.context = new Comment({
    message: '[file]https://res.cloudinary.com/qiscus/image/upload/kvkfMnaPVv/Screenshot20170913-084754-topic-425-topic.jpg[/file]'
  })
})
test('isAttachment should return true', t => {
  const comment = t.context
  t.truthy(comment.isAttachment(comment.message))
})
test('isImageAttachment should return true', t => {
  const comment = t.context
  t.truthy(comment.isImageAttachment(comment.message))
})
test('should silently fail when the url are invalid', t => {
  const comment = t.context
  t.falsy(comment.isImageAttachment('[file]http://[/file]'))
  t.is(comment.getAttachmentURI('[file]http://[/file]'), 'http://')
})
test('should return corrent url', t => {
  const comment = t.context
  const uri = 'http://www.url.com/gambar.jpg'
  t.is(comment.getAttachmentURI(`[file]${uri}[/file]`), uri)
})
