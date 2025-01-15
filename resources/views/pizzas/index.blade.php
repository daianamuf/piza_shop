<!DOCTYPE html>
<html>
<head>
    <title>Pizza List</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-5">
    <h1>Pizza Shop</h1>
    <a href="{{ route('pizzas.create') }}" class="btn btn-primary mb-3">Add New Pizza</a>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pizzas as $pizza)
                <tr>
                    <td>{{ $pizza->id }}</td>
                    <td>{{ $pizza->name }}</td>
                    <td>{{ $pizza->ingredients }}</td>
                    <td>${{ $pizza->price }}</td>
                    <td>
                    @if ($pizza->image_url)
                        <img src="{{ $pizza->image_url }}" alt="{{ $pizza->name }}" style="width: 100px; height: auto;">
                    @else
                        No Image
                    @endif
                </td>
                    <td>
                        <a href="{{ route('pizzas.edit', $pizza->id) }}" class="btn btn-warning btn-sm">Edit</a>
                        <form action="{{ route('pizzas.destroy', $pizza->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
