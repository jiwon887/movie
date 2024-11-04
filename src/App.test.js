import { render, screen } from '@testing-library/react';
import App from './App';  // 경로가 맞는지 확인하세요

test('renders popular movies header', () => {
  render(<App />);
  // 여기에서 '인기 영화'라는 텍스트로 변경
  const headerElement = screen.getByText(/인기 영화/i);  // 실제 화면에 있는 텍스트로 수정
  expect(headerElement).toBeInTheDocument();
});
