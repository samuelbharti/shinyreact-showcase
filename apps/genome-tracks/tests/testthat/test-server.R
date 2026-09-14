# Layer two: drive the reactive graph with no browser. testServer() hands
# back exactly the JSON the client would have received.

test_that("the chromosome list is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_length(output$genome_meta$chromosomes, 3L)
    expect_length(output$genome_meta$biotypes, 4L)
  })
})

test_that("choosing a chromosome sends that chromosome", {
  shiny::testServer(server, {
    session$setInputs(chromosome = "chr7")

    expect_equal(output$chromosome_data$name, "chr7")
    expect_equal(output$chromosome_data$genes, 5200L)
    expect_true(nzchar(output$chromosome_data$start))
  })
})

test_that("no chromosome chosen yet sends nothing", {
  shiny::testServer(server, {
    session$setInputs(chromosome = "")
    expect_null(output$chromosome_data)
  })
})

test_that("clicking a gene returns its details", {
  shiny::testServer(server, {
    session$setInputs(chromosome = "chr1", gene_click = 123L)

    expect_equal(output$gene_info$name, "PCG00123")
    expect_equal(output$gene_info$chromosome, "chr1")
  })
})

test_that("clearing the selection returns nothing", {
  # The client sends -1 when nothing is selected. req() would do the same
  # job, but its silent error still reaches the client console.
  shiny::testServer(server, {
    session$setInputs(chromosome = "chr1", gene_click = -1L)
    expect_null(output$gene_info)
  })
})

test_that("a stale gene index does not take the output down", {
  # A click can outlive a chromosome change, and chr17 has fewer genes than
  # chr1. The index then points past the end.
  shiny::testServer(server, {
    session$setInputs(chromosome = "chr17", gene_click = 7999L)
    expect_null(output$gene_info)
  })
})
