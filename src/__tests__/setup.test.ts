/**
 * Sample test file demonstrating the testing setup
 * This ensures the test framework is properly configured
 */

describe('Testing Framework', () => {
  it('should be properly configured', () => {
    expect(true).toBe(true);
  });

  it('should support async tests', async () => {
    const promise = Promise.resolve('test');
    await expect(promise).resolves.toBe('test');
  });

  it('should have Jest DOM matchers available', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello World';
    document.body.appendChild(element);
    expect(element).toBeInTheDocument();
    document.body.removeChild(element);
  });
});
