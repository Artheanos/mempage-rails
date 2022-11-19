import { formatDate } from "../../src/utils/dates";

describe('formatDate', () => {
  it('something', () => {
    const input = "2022-11-07T16:51:05.365Z"
    expect(formatDate(input)).toEqual("Nov 7, 2022")
  })
})
