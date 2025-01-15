<!DOCTYPE html>
<html>
<head>
    <title>Create Pizza</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-5">
    <h1>Add a New Pizza</h1>
    <form action="{{ route('pizzas.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Pizza Name</label>
            <input type="text" name="name" id="name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="ingredients" class="form-label">Ingredients</label>
            <textarea name="ingredients" id="ingredients" class="form-control"></textarea>
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" name="price" id="price" class="form-control" step="0.01" required>
        </div>
        <div class="mb-3">
    <label for="image_url" class="form-label">Image URL</label>
    <input type="url" name="image_url" id="image_url" class="form-control">
</div>

        <button type="submit" class="btn btn-success">Add Pizza</button>
    </form>
    <a href="{{ route('pizzas.index') }}" class="btn btn-secondary mt-3">Back to List</a>
</body>
</html>
