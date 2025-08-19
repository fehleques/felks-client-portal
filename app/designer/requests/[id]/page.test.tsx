import { render, screen, act } from '@testing-library/react'
import RequestPage, { fetchRequest } from './page'
import { useParams } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}))

describe('fetchRequest', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('returns request for valid id', async () => {
    const promise = fetchRequest('req1')
    jest.advanceTimersByTime(300)
    await expect(promise).resolves.toEqual(expect.objectContaining({ id: 'req1' }))
  })

  test('throws error for invalid id', async () => {
    const promise = fetchRequest('unknown')
    jest.advanceTimersByTime(300)
    await expect(promise).rejects.toThrow('Request not found')
  })
})

describe('RequestPage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  test('renders request details', async () => {
    ;(useParams as jest.Mock).mockReturnValue({ id: 'req1' })
    render(<RequestPage />)

    await act(async () => {
      jest.advanceTimersByTime(300)
    })

    expect(await screen.findByText('Logo redesign')).toBeInTheDocument()
    expect(screen.getByText('ID: req1')).toBeInTheDocument()
  })

  test('renders error when request missing', async () => {
    ;(useParams as jest.Mock).mockReturnValue({ id: 'unknown' })
    render(<RequestPage />)

    await act(async () => {
      jest.advanceTimersByTime(300)
    })

    expect(await screen.findByText('Request not found')).toBeInTheDocument()
  })
})
