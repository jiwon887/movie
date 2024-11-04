import { render, screen } from '@testing-library/react';
import App from './App';  // 경로가 맞는지 확인

test('renders learn react link', () => {
  render(<App />);
  // "learn react" 대신 실제 화면에 있는 텍스트로 수정
  const linkElement = screen.getByText(/인기 영화/i);  // 예: 실제 렌더링된 내용으로 변경
  expect(linkElement).toBeInTheDocument();
});
