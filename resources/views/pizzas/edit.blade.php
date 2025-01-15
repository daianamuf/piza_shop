<!DOCTYPE html>
<html>
<head>
    <title>Edit Pizza</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-5">
    <h1>Edit Pizza</h1>
    <form action="{{ route('pizzas.update', $pizza->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Pizza Name</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ $pizza->name }}" required>
        </div>

        <div class="mb-3">
            <label for="ingredients" class="form-label">Ingredients</label>
            <textarea name="ingredients" id="ingredients" class="form-control">{{ $pizza->ingredients }}</textarea>
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" name="price" id="price" class="form-control" value="{{ $pizza->price }}" step="0.01" required>
        </div>

        <div class="mb-3">
            <label for="image_url" class="form-label">Image URL</label>
            <input type="url" name="image_url" id="image_url" class="form-control" value="{{ $pizza->image_url }}">
        </div>

        <button type="submit" class="btn btn-success">Update Pizza</button>
        <a href="{{ route('pizzas.index') }}" class="btn btn-secondary">Back</a>
    </form>
</body>
</html>
