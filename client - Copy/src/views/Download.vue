<template>
    <main>
            <div class="position-relative">
      <!-- shape Hero -->
      <section class="section section-lg section-shaped pb-250">
        <div class="shape shape-style-1 shape-default">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container py-lg-md d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3  text-white">A beautiful Design System
                  <span>completed with examples</span>
                </h1>
                <p class="lead  text-white">The design system comes with four pre-built pages to help you get started faster. You can change the text and images and you're good to go.</p>
              </div>
            </div>
          </div>
        </div>
        <!-- SVG separator -->
        <div class="separator separator-bottom separator-skew">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow">
                  <div class="card-body py-5">
                    <div class="icon icon-shape icon-shape-primary rounded-circle mb-4">
                      <i class="fa fa-windows"></i>
                    </div>
                    <h6 class="text-primary">Download For Windows</h6>
                    <p class="description mt-3">Floob for Windows is a great way to experience the joys of sharing videos without the need to always have the correct tab open.</p>
                    <button type="button" class="btn btn-lg btn-primary mt-4">Download</button>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow">
                  <div class="card-body py-5">
                    <div class="icon icon-shape icon-shape-success rounded-circle mb-4">
                      <i class="fa fa-apple"></i>
                    </div>
                    <h6 class="text-success">Download for Mac</h6>
                    <p class="description mt-3">Floob for Mac is a great way to experience the joys of sharing videos without the need to always have the correct tab open.</p>
                    <button type="button" class="btn btn-lg btn-primary mt-4" disabled>Coming Soon</button>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow">
                  <div class="card-body py-5">
                    <div class="icon icon-shape icon-shape-warning rounded-circle mb-4">
                      <i class="fa fa-linux"></i>
                    </div>
                    <h6 class="text-warning">Download for Linux</h6>
                    <p class="description mt-3">Floob for Linux is a great way to experience the joys of sharing videos without the need to always have the correct tab open.</p>
                    <button type="button" class="btn btn-lg btn-primary mt-4" disabled>Coming Soon</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
</template>

<script>
    export default {
        name: 'Download',
        data() {
            return {
                
            }
        }
    }
</script>

<style scoped>
.card-body{
    text-align: center;
}
.section{
    padding-bottom: 0;
}
</style>