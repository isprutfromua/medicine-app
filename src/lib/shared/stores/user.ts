import { readable } from 'svelte/store';
import { getUniqueId } from '$lib/shared/utils';
import { browser } from '$app/environment';
import { storage } from '$lib/shared/storage';

const id = getUniqueId();
const initialUserId = browser ? storage.getItem('userId', null) : null;

if (!initialUserId && browser) {
	storage.setItem('userId', id);
}

export const userID = readable(initialUserId || id);
