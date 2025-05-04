import { Either, left, right } from './either'

function doSomenting(x: boolean): Either<string, string> {
  if (x) {
    return right('success')
  }
  return left('error')
}

test('success result', () => {
  const result = doSomenting(true)

  if (result.isRight()) {
    console.log(result.value)
  }

  expect(result.isRight()).toBeTruthy()
})

test('error result', () => {
  const result = doSomenting(false)

  expect(result.isLeft()).toBeTruthy()
})
