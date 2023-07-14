<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="px-20 py-10">
	<table class="table-zebra table">
		<thead>
			<tr>
				<th>Employee Id</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Position</th>
				<th>Salary</th>
				<th>Shop Id</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data.employees as employee}
				<tr>
					<td>{employee.id}</td>
					<td>{employee.firstName}</td>
					<td>{employee.lastName}</td>
					<td>{employee.email}</td>
					<td>{employee.position}</td>
					<td>
						{
							employee.salary.toLocaleString('en-AU', {
								style: 'currency',
								currency: 'AUD',
								maximumFractionDigits: 0
							})
						}
					</td>
					<td>{employee.shopId}</td>
					<td>
						<a href={`/dashboard/staff/${employee.id}`} class="link link-secondary">Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
