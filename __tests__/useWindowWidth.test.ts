import useWindowWidth from '@hooks/useWindowWidth';
import { act, renderHook } from '@testing-library/react';

describe('useWindowWidth', () => {
  it('should initialize with the current window width', () => {
    const initialWidth = window.innerWidth;

    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(initialWidth);
  });

  it('should update width on window resize', () => {
    const { result } = renderHook(() => useWindowWidth());

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(500);
  });
});
