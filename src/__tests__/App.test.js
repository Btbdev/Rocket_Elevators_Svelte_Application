import { render, screen } from '@testing-library/svelte';
import Home from 'src/routes/+page.svelte';

describe('Home', () => {
	test('Home renders correctly', () => {
		render(Home);
		expect(screen.getByText('Rocket')).toBeInTheDocument();
	});
});
