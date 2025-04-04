const useRouter = jest.fn();

useRouter.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn(),
  query: {},
  asPath: '/',
});

module.exports = {
  useRouter,
};