import { merge } from "../../src/utils/api";

describe('merge', () => {
  it('something', () => {
    const a = {
      type1: 1,
      messages: {
        type1: '1',
        type3: '3'
      }
    }

    const b = {
      type2: 2,
      messages: {
        type1: '1',
        type2: '2'
      }
    }

    expect(merge(a, b)).toEqual({
      type1: 1,
      messages: { type1: '1', type3: '3', type2: '2' },
      type2: 2
    })
  })
})
