import test from 'ava'
import Comment from '../lib/comment'

test.beforeEach(t => {
  t.context = new Comment({
    id: '13',
    type: 'unknown',
    message: '<script>alert(\'test\')</script>'
  })
})

test('should return a comment object when instantiated', t => {
  t.truthy(t.context instanceof Comment)
})
test('should escape special character in message', t => {
  t.is(t.context.message, '&lt;script&gt;alert(\'test\')&lt;/script&gt;')
  t.truthy(t.context.id)
})
test('should return false for properties isPending', t => {
  t.falsy(t.context.isPending)
})
test('should return false for properties isFailed', t => {
  t.falsy(t.context.isFailed)
})
test('should give default type of `unknown` when message type is not supported', t => {
  const comment = t.context
  t.is(comment.type, 'unknown')
})
test('should set a unique id if `attachUniqueId` is called', t => {
  const comment = t.context
  comment.attachUniqueId('test')
  t.is(comment.unique_id, 'test')
})
