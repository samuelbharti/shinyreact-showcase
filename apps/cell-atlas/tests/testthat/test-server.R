# Layer two: drive the reactive graph with no browser. testServer() sets an
# input and hands back exactly the JSON value the client would have received.
# Python has no equivalent, which is why the logic above is importable.

test_that("the point cloud is sent without waiting for any input", {
  shiny::testServer(server, {
    # This output reads no input, so it must resolve on connect. If it ever
    # starts depending on one, the client shows an empty plot forever.
    expect_equal(output$atlas_points$n_cells, 200000L)
    expect_true(nzchar(output$atlas_points$x))
  })
})

test_that("no gene chosen means no expression payload", {
  shiny::testServer(server, {
    session$setInputs(gene = -1L)
    expect_null(output$gene_expression)
  })
})

test_that("choosing a gene returns that gene", {
  shiny::testServer(server, {
    session$setInputs(gene = 3L)
    expect_equal(output$gene_expression$gene, "NKG7")
    expect_gt(output$gene_expression$max, 0)
  })
})

test_that("an empty selection returns a zero summary, not an error", {
  shiny::testServer(server, {
    session$setInputs(selection = "")
    expect_equal(output$selection_summary$n, 0L)
  })
})

test_that("a lasso selection comes back summarized", {
  nk <- which(ATLAS$cluster == 6L)[1:500] - 1L
  encoded <- jsonlite::base64_enc(
    writeBin(as.integer(nk), raw(), size = 4L, endian = "little")
  )

  shiny::testServer(server, {
    session$setInputs(selection = encoded)

    expect_equal(output$selection_summary$n, 500L)
    expect_equal(output$selection_summary$composition[[1]]$name, "NK cells")
    expect_equal(output$selection_summary$markers[[1]]$gene, "NKG7")
  })
})
