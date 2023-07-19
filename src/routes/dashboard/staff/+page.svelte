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
				{#if data.user.position === "HR Officer"}
					<th></th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each data.employees as employee}
				<tr>
					<td>{employee.userId}</td>
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
					{#if data.user.position === "HR Officer"}
						<td>
							<a href={`/dashboard/staff/modify/${employee.userId}`} class="link link-secondary">Edit</a>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>

	<a href="/dashboard/staff/create" class="btn btn-secondary w-full my-10">Create New User</a>
</div>
