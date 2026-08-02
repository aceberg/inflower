import { apiPath } from "../../functions/api"
import { configStore } from "../../store/configs"

function Category() {

  return (
    <div class="card border-primary">
      <div class="card-header">Categories (comma-separated)</div>
      <div class="card-body">
        <form action={apiPath + '/api/category/'} method="post" class="m-2">
          <textarea name="categories" class="form-control" value={configStore.config.Categories.join(", ")} required placeholder="Comma-separated categories"></textarea>
          <button type="submit" class="btn btn-primary mt-3">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Category