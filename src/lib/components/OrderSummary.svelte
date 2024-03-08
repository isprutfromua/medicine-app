<script lang="ts">
	import { cartShipping, cartSubTotal, cartTax, cartTotal } from '$stores/cart';
</script>

<dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
	<div class="flex items-center justify-between">
		<dt class="text-sm">Subtotal</dt>
		<dd class="text-sm font-medium text-gray-900">${$cartSubTotal}</dd>
	</div>
	<div class="flex items-center justify-between">
		<dt class="text-sm">Shipping</dt>
		<dd class="text-sm font-medium text-gray-900">${cartShipping}</dd>
	</div>
	<div class="flex items-center justify-between">
		<dt class="text-sm">Taxes</dt>
		<dd class="text-sm font-medium text-gray-900">${cartTax}</dd>
	</div>
	<div class="flex items-center justify-between border-t border-gray-200 pt-6">
		<dt class="text-base font-medium">Total</dt>
		<dd class="text-base font-medium text-gray-900">${$cartTotal}</dd>
	</div>
</dl>
