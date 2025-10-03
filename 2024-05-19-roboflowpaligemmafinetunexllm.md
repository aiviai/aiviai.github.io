---
layout: single
title: "roboflow+Paligemma微调识别X光片大模型"
sidebar:
  nav: "docs"
date: 2024-05-19 00:00:00 +0800
categories: [Fine-Tuning, LLM, Vision]
tags: [AI, HuggingFace, TensorFlow, Vision]
classes: wide
author_profile: true
---


#  roboflow+Paligemma微调识别X光片大模型 

###  colab在线体验 

[ https://colab.research.google.com/drive/1xBmU7VNDRXPjhctFiBHqimA446I0i6qe#scrollTo=cb9NEdq2s-nf ](<https://colab.research.google.com/drive/1xBmU7VNDRXPjhctFiBHqimA446I0i6qe#scrollTo=cb9NEdq2s-nf>)

###  本地运行 
    
    
```
    # 请在命令行中运行以下安装命令，或确保这些库已正确安装
    # pip install torch numpy Pillow requests
    # pip install git+https://github.com/huggingface/transformers.git
    #AI超元域频道原创视频(视频禁止盗搬，违者必究！)
```
    
```
    import torch
    import numpy as np
    from PIL import Image
    import requests
```
    
```
    # 定义输入文本和图像URL
    input_text = "What color is the flower that bee is standing on?"
    img_url = "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/transformers/tasks/bee.JPG?download=true"
    response = requests.get(img_url, stream=True)
    input_image = Image.open(response.raw).convert("RGB")
```
    
    from transformers import PaliGemmaForConditionalGeneration, PaliGemmaProcessor
    
    # 设置设备，自动检测是否支持CUDA
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
```
    # 初始化模型和处理器
    model_id = "leo009/paligemma-3b-mix-224"
    model = PaliGemmaForConditionalGeneration.from_pretrained(model_id, torch_dtype=torch.bfloat16).to(device)
    processor = PaliGemmaProcessor.from_pretrained(model_id)
```
    
    # 处理输入
    inputs = processor(text=input_text, images=input_image, padding="longest", return_tensors="pt").to(device)
    
```
    # 生成输出
    with torch.no_grad():
        output = model.generate(**inputs, max_length=496)
```
    
```
    # 打印解码后的输出
    result = processor.decode(output[0], skip_special_tokens=True)
    print(result)
```
    

###  环境配置 
    
    
    # pip install roboflow supervision
    
    
```
    #Roboflow是一个用于构建和管理计算机视觉应用的数据标注平台。
    #它提供了一套工具，用于轻松地收集、标注和增强图像和视频数据集。
    #Roboflow还提供了一个公开的平台，用于共享和下载数据集和模型。
```
    
    #AI超元域频道原创视频(视频禁止盗搬，违者必究！)
    
    ###执行下载roboflow数据集
    
    import os
    from roboflow import Roboflow
    
    # 直接赋值 API 密钥 此处用Private API Key https://app.roboflow.com/win4r/settings/api
    ROBOFLOW_API_KEY = "hrhnEY2OmKYHI6BbVYP5"
    
```
    # 使用 Roboflow API 密钥初始化
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace("srinithi-s-tzdkb").project("fracture-detection-rhud5")
    version = project.version(4)
    dataset = version.download("paligemma")
```
    
    
    
    # pip install numpy supervision
    
    # python annotate_image.py
    
    #AI超元域频道原创视频(视频禁止盗搬，违者必究！)
    
    ###这段代码定义了一个 `from_pali_gemma` 函数，用于解析带有检测结果的字符串，并将其转换为 `sv.Detections` 对象。然后，代码从注释文件中读取图像信息和检测结果，加载图像并应用检测结果进行标注，最后显示标注后的图像。
    
```
    import re
    import numpy as np
    import supervision as sv
    from typing import Tuple, List, Optional
    from PIL import Image
    import json
```
    
```
    # 定义 from_pali_gemma 函数
    def from_pali_gemma(
        response: str,
        resolution_wh: Tuple[int, int],
        classes: Optional[List[str]] = None
    ) -> sv.Detections:
        _SEGMENT_DETECT_RE = re.compile(
            r'(.*?)' +
            r'<loc(\d{4})>' * 4 + r'\s*' +
            '(?:%s)?' % (r'<seg(\d{3})>' * 16) +
            r'\s*([^;<>]+)? ?(?:; )?',
        )
```
    
```
        width, height = resolution_wh
        xyxy_list = []
        class_name_list = []
```
    
```
        while response:
            m = _SEGMENT_DETECT_RE.match(response)
            if not m:
                break
```
    
```
            gs = list(m.groups())
            before = gs.pop(0)
            name = gs.pop()
            y1, x1, y2, x2 = [int(x) / 1024 for x in gs[:4]]
            y1, x1, y2, x2 = map(round, (y1*height, x1*width, y2*height, x2*width))
```
    
```
            content = m.group()
            if before:
                response = response[len(before):]
                content = content[len(before):]
```
    
```
            xyxy_list.append([x1, y1, x2, y2])
            class_name_list.append(name.strip())
            response = response[len(content):]
```
    
        xyxy = np.array(xyxy_list)
        class_name = np.array(class_name_list)
    
```
        if classes is None:
            class_id = None
        else:
            class_id = np.array([classes.index(name) for name in class_name])
```
    
```
        return sv.Detections(
            xyxy=xyxy,
            class_id=class_id,
            data={'class_name': class_name}
        )
```
    
```
    # 从数据集加载第一个注释
    dataset_location = "/home/Ubuntu/fracture-detection-4"  # 替换为实际的数据集路径
    first = json.loads(open(f"{dataset_location}/dataset/_annotations.train.jsonl").readline())
    print(first)
```
    
```
    # 打开图像文件
    image = Image.open(f"{dataset_location}/dataset/{first.get('image')}")
    CLASSES = first.get('prefix').replace("detect ", "").split(" ; ")
    detections = from_pali_gemma(first.get('suffix'), image.size, CLASSES)
```
    
    # 进行图像标注
    sv.BoundingBoxAnnotator().annotate(image, detections)
    

###  下载配置big_vision 
    
    
    # 下载 big_vision 仓库：
    #AI超元域频道原创视频(视频禁止盗搬，违者必究！)
    
    
    git clone --quiet --branch=main --depth=1 https://github.com/google-research/big_vision big_vision_repo
    
    
    # 设置 PYTHONPATH 环境变量：
    export PYTHONPATH=$PYTHONPATH:$(pwd)/big_vision_repo
    

###  下载模型 
    
    
    #AI超元域频道原创视频(视频禁止盗搬运，违者必究！)
    
    #常规下载方式
    https://www.kaggle.com/api/v1/models/google/paligemma/jax/paligemma-3b-pt-224/1/download/paligemma-3b-pt-224.f16.npz
    
    #AI超元域频道提供的下载链接
    https://huggingface.co/leo009/paligemma-3b-pt-224.f16.npz/resolve/main/paligemma-3b-pt-224.f16.npz
    
    下载后我放在了这个路径:
    /home/Ubuntu/paligemma-3b-pt-224.f16.npz

###  下载 **paligemma_tokenizer.model**
    
    
```
    #AI超元域频道原创视频(视频禁止盗搬运，违者必究！)
    #常规下载方式
    pip install gsutil
```
    
    gsutil cp gs://big_vision/paligemma_tokenizer.model /home/Ubuntu/paligemma_tokenizer.model
    
    
    #AI超元域频道提供的下载链接
    https://huggingface.co/leo009/paligemma_tokenizer.model/resolve/main/paligemma_tokenizer.model
    
    #文件完整路径 /home/Ubuntu/paligemma_tokenizer.model
    
    

###  加载模型和标记器 
    
    
    #python load_model_and_tokenizer.py
    
    #AI超元域频道原创视频(视频禁止盗搬运，违者必究！)
    import os
    
```
    # 设置本地文件路径
    MODEL_PATH = "/home/Ubuntu/paligemma-3b-pt-224.f16.npz"
    TOKENIZER_PATH = "/home/Ubuntu/paligemma_tokenizer.model"
```
    
```
    # 加载模型示例
    def load_model(model_path):
        # 这里需要根据具体模型文件格式加载模型
        print(f"Loading model from {model_path}...")
        # 模型加载代码
        pass
```
    
```
    # 加载标记器示例
    def load_tokenizer(tokenizer_path):
        # 这里需要根据具体标记器文件格式加载标记器
        print(f"Loading tokenizer from {tokenizer_path}...")
        # 标记器加载代码
        pass
```
    
```
    # 加载模型和标记器
    load_model(MODEL_PATH)
    load_tokenizer(TOKENIZER_PATH)
```
    
    print("Model and tokenizer loaded successfully.")
    

###  训练 
    
    
```
    #AI超元域频道原创视频(视频禁止盗搬运，违者必究！)
    #安装依赖项
    pip install jaxlib tensorflow sentencepiece ml_collections ipython pillow
```
    
    pip install flax optax tensorflow-datasets
    
    pip install einops
    
    pip install jax[cuda12]
    

##  🔥🔥🔥如有问题请联系我的徽信: stoeng 

  
  


###  完整代码 
    
    
    #AI超元域频道原创视频(视频禁止盗搬运，违者必究！)
    
```
    import base64
    import functools
    import html
    import io
    import os
    import warnings
```
    
```
    import jax
    import jax.numpy as jnp
    import numpy as np
    import ml_collections
```
    
    import tensorflow as tf
    import sentencepiece
    
    from IPython.core.display import display, HTML
    
    import torch  # 确保导入 torch
    from PIL import Image
    
```
    # Import model definition from big_vision
    from big_vision.models.proj.paligemma import paligemma
    from big_vision.trainers.proj.paligemma import predict_fns
```
    
```
    # Import big vision utilities
    import big_vision.datasets.jsonl
    import big_vision.utils
    import big_vision.sharding
```
    
```
    # 设置本地文件路径
    MODEL_PATH = "/home/Ubuntu/paligemma-3b-pt-224.f16.npz"
    TOKENIZER_PATH = "/home/Ubuntu/paligemma_tokenizer.model"
    dataset_location = "/home/Ubuntu/fracture-detection-4"
```
    
    
```
    # 加载模型示例
    def load_model(model_path):
        print(f"Loading model from {model_path}...")
        model = np.load(model_path)  # 使用 NumPy 加载模型
        return model
```
    
```
    # 加载标记器示例
    def load_tokenizer(tokenizer_path):
        print(f"Loading tokenizer from {tokenizer_path}...")
        with open(tokenizer_path, 'rb') as f:
            tokenizer = f.read()  # 根据标记器的实际格式调整
        return tokenizer
```
    
```
    # 加载模型和标记器
    model = load_model(MODEL_PATH)
    tokenizer = load_tokenizer(TOKENIZER_PATH)
    print("Model and tokenizer loaded successfully.")
```
    
```
    # 不要限制TF使用GPU或TPU
    # tf.config.set_visible_devices([], "GPU")
    # tf.config.set_visible_devices([], "TPU")
```
    
```
    # 检查是否有GPU可用
    gpus = tf.config.experimental.list_physical_devices('GPU')
    if gpus:
        try:
            # 设置GPU使用限制为按需增长，而不是预先分配所有的显存
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
        except RuntimeError as e:
            print(e)
```
    
```
    backend = jax.lib.xla_bridge.get_backend()
    print(f"JAX version:  {jax.__version__}")
    print(f"JAX platform: {backend.platform}")
    print(f"JAX devices:  {jax.device_count()}")
```
    
```
    # 如果你希望JAX使用GPU，确保CUDA和cuDNN已正确安装并配置
    if backend.platform == 'gpu':
        print("JAX is using GPU")
    else:
        print("JAX is not using GPU, check your CUDA/cuDNN installation.")
```
    
    
    
    # @title Construct model and load params into RAM.
    
```
    # Define model
    model_config = ml_collections.FrozenConfigDict({
        "llm": {"vocab_size": 257_152},
        "img": {"variant": "So400m/14", "pool_type": "none", "scan": True, "dtype_mm": "float16"}
    })
    model = paligemma.Model(**model_config)
    tokenizer = sentencepiece.SentencePieceProcessor(TOKENIZER_PATH)
```
    
    # 加载参数
    params = paligemma.load(None, MODEL_PATH, model_config)
    
```
    # 定义 `decode` 函数以从模型中采样输出。
    decode_fn = predict_fns.get_all(model)['decode']
    decode = functools.partial(decode_fn, devices=jax.devices(), eos_token=tokenizer.eos_id())
```
    
    
    
```
    # 将参数移至 GPU 内存
    #
    # 创建可训练参数的 pytree 掩码。
    def is_trainable_param(name, param):  # pylint: disable=unused-argument
      if name.startswith("llm/layers/attn/"):  return True
      if name.startswith("llm/"):              return False
      if name.startswith("img/"):              return False
      raise ValueError(f"Unexpected param name {name}")
    trainable_mask = big_vision.utils.tree_map_with_names(is_trainable_param, params)
```
    
```
    #
    # 如果有多个设备可用（例如，多块 GPU），可以将参数分片到这些设备上，以减少每个设备的 HBM 使用量。
    mesh = jax.sharding.Mesh(jax.devices(), ("data"))
```
    
    data_sharding = jax.sharding.NamedSharding(
        mesh, jax.sharding.PartitionSpec("data"))
    
    params_sharding = big_vision.sharding.infer_sharding(
        params, strategy=[('.*', 'fsdp(axis="data")')], mesh=mesh)
    
```
    # Yes: Some donated buffers are not usable.
    warnings.filterwarnings(
        "ignore", message="Some donated buffers were not usable")
```
    
```
    @functools.partial(jax.jit, donate_argnums=(0,), static_argnums=(1,))
    def maybe_cast_to_f32(params, trainable):
      return jax.tree.map(lambda p, m: p.astype(jnp.float32) if m else p,
                          params, trainable)
```
    
```
    # Loading all params in simultaneous - albeit much faster and more succinct -
    # requires more RAM than the T4 colab runtimes have by default (12GB RAM).
    # Instead we do it param by param.
    params, treedef = jax.tree.flatten(params)
    sharding_leaves = jax.tree.leaves(params_sharding)
    trainable_leaves = jax.tree.leaves(trainable_mask)
    for idx, (sharding, trainable) in enumerate(zip(sharding_leaves, trainable_leaves)):
      params[idx] = big_vision.utils.reshard(params[idx], sharding)
      params[idx] = maybe_cast_to_f32(params[idx], trainable)
      params[idx].block_until_ready()
    params = jax.tree.unflatten(treedef, params)
```
    
```
    # Print params to show what the model is made of.
    def parameter_overview(params):
      for path, arr in big_vision.utils.tree_flatten_with_names(params)[0]:
        print(f"{path:80s} {str(arr.shape):22s} {arr.dtype}")
```
    
    print(" == Model params == ")
    parameter_overview(params)
    
    
    
    # @title Define preprocess functions to create inputs to the model.
    
```
    def preprocess_image(image, size=224):
      # 模型已被训练处理不同纵横比的图像，这些图像被调整为 224x224，范围在 [-1, 1] 之间。
      # 双线性和抗锯齿缩放选项有助于提高某些任务的质量。
      image = np.asarray(image)
      if image.ndim == 2:  # Convert image without last channel into greyscale.
        image = np.stack((image,)*3, axis=-1)
      image = image[..., :3]  # Remove alpha layer.
      assert image.shape[-1] == 3
```
    
```
      image = tf.constant(image)
      image = tf.image.resize(image, (size, size), method='bilinear', antialias=True)
      return image.numpy() / 127.5 - 1.0  # [0, 255]->[-1,1]
```
    
```
    def preprocess_tokens(prefix, suffix=None, seqlen=None):
      # 模型已被训练处理由带有全注意力的前缀和带有因果注意力的后缀组成的标记化文本。
      separator = "\n"
      tokens = tokenizer.encode(prefix, add_bos=True) + tokenizer.encode(separator)
      mask_ar = [0] * len(tokens)    # 0 to use full attention for prefix.
      mask_loss = [0] * len(tokens)  # 0 to not use prefix tokens in the loss.
```
    
```
      if suffix:
        suffix = tokenizer.encode(suffix, add_eos=True)
        tokens += suffix
        mask_ar += [1] * len(suffix)    # 1 to use causal attention for suffix.
        mask_loss += [1] * len(suffix)  # 1 to use suffix tokens in the loss.
```
    
```
      mask_input = [1] * len(tokens)    # 1 if its a token, 0 if padding.
      if seqlen:
        padding = [0] * max(0, seqlen - len(tokens))
        tokens = tokens[:seqlen] + padding
        mask_ar = mask_ar[:seqlen] + padding
        mask_loss = mask_loss[:seqlen] + padding
        mask_input = mask_input[:seqlen] + padding
```
    
      return jax.tree.map(np.array, (tokens, mask_ar, mask_loss, mask_input))
    
```
    def postprocess_tokens(tokens):
      tokens = tokens.tolist()  # np.array to list[int]
      try:  # Remove tokens at and after EOS if any.
        eos_pos = tokens.index(tokenizer.eos_id())
        tokens = tokens[:eos_pos]
      except ValueError:
        pass
      return tokenizer.decode(tokens)
```
    
    
    
    # 函数用于遍历训练和验证样本。
    SEQLEN = 128
    
```
    # TODO: 考虑使用跳过 big_vision 和 tf.data 的数据迭代器？
    train_dataset = big_vision.datasets.jsonl.DataSource(
        os.path.join(dataset_location, "dataset/_annotations.train.jsonl"),
        fopen_keys={"image": f"{dataset_location}/dataset"})
```
    
```
    val_dataset = big_vision.datasets.jsonl.DataSource(
        os.path.join(dataset_location, "dataset/_annotations.valid.jsonl"),
        fopen_keys={"image": f"{dataset_location}/dataset"})
```
    
    
```
    def train_data_iterator():
      """无限循环遍历训练样本的迭代器。"""
      # 对样本进行打乱并重复，这样可以进行多轮训练。
      dataset = train_dataset.get_tfdata().shuffle(1_000).repeat()
      for example in dataset.as_numpy_iterator():
        image = Image.open(io.BytesIO(example["image"]))
        image = preprocess_image(image)
```
    
```
        # prefix = "caption en"  # Could also be a different prefix per example.
        prefix = example["prefix"].decode().lower()
        suffix = example["suffix"].decode().lower()
        tokens, mask_ar, mask_loss, _ = preprocess_tokens(prefix, suffix, SEQLEN)
```
    
```
        yield {
            "image": np.asarray(image),
            "text": np.asarray(tokens),
            "mask_ar": np.asarray(mask_ar),
            "mask_loss": np.asarray(mask_loss),
        }
```
    
    
```
    def validation_data_iterator():
      """遍历验证样本的单次迭代器。"""
      for example in val_dataset.get_tfdata(ordered=True).as_numpy_iterator():
        image = Image.open(io.BytesIO(example["image"]))
        image = preprocess_image(image)
```
    
```
        # prefix = "caption en"  # 每个样本也可以使用不同的前缀。
        prefix = example["prefix"].decode().lower()
        tokens, mask_ar, _, mask_input = preprocess_tokens(prefix, seqlen=SEQLEN)
```
    
```
        yield {
            "image": np.asarray(image),
            "text": np.asarray(tokens),
            "mask_ar": np.asarray(mask_ar),
            "mask_input": np.asarray(mask_input),
        }
```
    
    
    
    
    
```
    # 检查训练样本。
    def split_and_keep_second_part(s):
      parts = s.split('\n', 1)
      if len(parts) > 1:
        return parts[1]
      return s
```
    
```
    def render_inline(image, resize=(128, 128)):
      """Convert image into inline html."""
      image = Image.fromarray(image)
      image.resize(resize)
      with io.BytesIO() as buffer:
        image.save(buffer, format='jpeg')
        image_b64 = str(base64.b64encode(buffer.getvalue()), "utf-8")
        return f"data:image/jpeg;base64,{image_b64}"
```
    
```
    def render_example(image, caption):
      image = ((image + 1)/2 * 255).astype(np.uint8)  # [-1,1] -> [0, 255]
      h, w, _ = image.shape
      try:
          detections = from_pali_gemma(caption, (w, h), CLASSES)
          image = sv.BoundingBoxAnnotator().annotate(image, detections)
      except:
          print("result render failed, result:", caption)
      return f"""
        <div style="display: inline-flex; align-items: center; justify-content: center;">
            <img style="width:128px; height:128px;" src="{render_inline(image, resize=(64,64))}" />
            <p style="width:256px; margin:10px; font-size:small;">{html.escape(caption)}</p>
        </div>
        """
```
    
```
    html_out = ""
    for idx, example in zip(range(8), train_data_iterator()):
      caption = postprocess_tokens(example["text"])  # detokenize model input.
      caption = split_and_keep_second_part(caption)
      html_out += render_example(example["image"], caption)
```
    
    print("Training examples")
    display(HTML(html_out))
    
    #print(html_out)  # 直接打印HTML内容
    
```
    # 保存HTML内容到文件
    with open("/home/Ubuntu/Trainingexamples.html", "w") as f:
        f.write(html_out)
    print("HTML content saved to Trainingexamples.html")
```
    
    
    #------------------------------------------
    
```
    # 定义训练步骤和评估循环
    #
    # 使用简单随机梯度下降（SGD）的主要更新函数。
    #
    @functools.partial(jax.jit, donate_argnums=(0,))
    def update_fn(params, batch, learning_rate):
      imgs, txts, mask_ar = batch["image"], batch["text"], batch["mask_ar"]
```
    
```
      def loss_fn(params):
        text_logits, _ = model.apply({"params": params}, imgs, txts[:, :-1], mask_ar[:, :-1], train=True)
        logp = jax.nn.log_softmax(text_logits, axis=-1)
```
    
```
        #  模型的输入是 txts[:, :-1]，但损失是定义为预测下一个标记 txts[:, 1:]。
        # 此外，mask_loss[:, 1:] 表示哪些标记是损失的一部分（例如，前缀和填充标记不包括在内）。
        mask_loss = batch["mask_loss"][:, 1:]
        targets = jax.nn.one_hot(txts[:, 1:], text_logits.shape[-1])
```
    
```
        # 计算每个样本的损失，即每个标记困惑度的平均值。
        # 由于每个样本的标记数量不同，我们进行归一化处理。
        token_pplx = jnp.sum(logp * targets, axis=-1)  # sum across vocab_size.
        example_loss = -jnp.sum(token_pplx * mask_loss, axis=-1)  # sum across seq_len.
        example_loss /= jnp.clip(jnp.sum(mask_loss, -1), 1)  # weight by num of tokens.
```
    
        # batch_loss: mean of per example loss.
        return jnp.mean(example_loss)
    
      loss, grads = jax.value_and_grad(loss_fn)(params)
    
```
      # 使用随机梯度下降（SGD）将梯度应用于可训练参数.
      def apply_grad(param, gradient, trainable):
        if not trainable: return param
        return param - learning_rate * gradient
```
    
      params = jax.tree_util.tree_map(apply_grad, params, grads, trainable_mask)
    
      return params, loss
    
```
    # 评估/推理循环。
    def make_predictions(data_iterator, *, num_examples=None,
                         batch_size=4, seqlen=SEQLEN, sampler="greedy"):
      outputs = []
      while True:
        # 构建批次中的样本列表。
        examples = []
        try:
          for _ in range(batch_size):
            examples.append(next(data_iterator))
            examples[-1]["_mask"] = np.array(True)  # Indicates true example.
        except StopIteration:
          if len(examples) == 0:
            return outputs
```
    
```
        #样本数量不足，无法完成一个批次。通过重复最后一个样本进行填充。
        while len(examples) % batch_size:
          examples.append(dict(examples[-1]))
          examples[-1]["_mask"] = np.array(False)  # Indicates padding example.
```
    
```
        # Convert list of examples into a dict of np.arrays and load onto devices.
        batch = jax.tree.map(lambda *x: np.stack(x), *examples)
        batch = big_vision.utils.reshard(batch, data_sharding)
```
    
```
        # 进行模型预测
        tokens = decode({"params": params}, batch=batch,
                        max_decode_len=seqlen, sampler=sampler)
```
    
```
        # 将模型预测获取到设备并进行去标记化。
        tokens, mask = jax.device_get((tokens, batch["_mask"]))
        tokens = tokens[mask]  # remove padding examples.
        responses = [postprocess_tokens(t) for t in tokens]
```
    
```
        # 附加到 html 输出。
        for example, response in zip(examples, responses):
          outputs.append((example["image"], response))
          if num_examples and len(outputs) >= num_examples:
            return outputs
```
    
    
    
    #没有微调的时候检查模型性能
    
```
    print("Model predictions")
    html_out = ""
    for image, caption in make_predictions(validation_data_iterator(), num_examples=8, batch_size=4):
      html_out += render_example(image, caption)
    display(HTML(html_out))
```
    
    
    #print(html_out)  # 直接打印HTML内容
    
```
    # 保存HTML内容到文件
    with open("/home/Ubuntu/output_without_finetuning.html", "w") as f:
        f.write(html_out)
    print("HTML content saved to output_without_finetuning.html")
```
    
    
    
    
    
```
    # 使用余弦学习率调度器运行简短的训练循环。
    #
    # 注意：由于 XLA 编译 jax.jit 函数，在某些机器上第一次迭代可能会非常慢（可能需要几分钟）。
```
    
```
    BATCH_SIZE = 8
    TRAIN_EXAMPLES = 512
    # TRAIN_EXAMPLES = 256
    LEARNING_RATE = 0.01
```
    
    TRAIN_STEPS = TRAIN_EXAMPLES // BATCH_SIZE
    EVAL_STEPS = TRAIN_STEPS // 8
    
    train_data_it = train_data_iterator()
    
```
    sched_fn = big_vision.utils.create_learning_rate_schedule(
        total_steps=TRAIN_STEPS+1, base=LEARNING_RATE,
        decay_type="cosine", warmup_percent=0.10)
```
    
```
    for step in range(1, TRAIN_STEPS+1):
      # 列出 N 个训练样本。
      examples = [next(train_data_it) for _ in range(BATCH_SIZE)]
```
    
```
      # 将示例列表转换为 np.arrays 的字典并加载到设备上。
      batch = jax.tree.map(lambda *x: np.stack(x), *examples)
      batch = big_vision.utils.reshard(batch, data_sharding)
```
    
```
      # 训练步骤并报告训练损失
      learning_rate = sched_fn(step)
      params, loss = update_fn(params, batch, learning_rate)
```
    
      loss = jax.device_get(loss)
      print(f"step: {step:2d}/{TRAIN_STEPS:2d}   lr: {learning_rate:.5f}   loss: {loss:.4f}")
    
```
      if step == 1 or (step % EVAL_STEPS) == 0:
        print(f"Model predictions at step {step}")
        html_out = ""
        for image, caption in make_predictions(
            validation_data_iterator(), num_examples=4, batch_size=4):
          html_out += render_example(image, caption)
        display(HTML(html_out))
        # 保存HTML内容到文件
        with open("/home/Ubuntu/output_training_loop.html", "w") as f:
            f.write(html_out)
        print("HTML content saved to output_training_loop.html")
```
    
    
    
```
    print("Model predictions")
    html_out = ""
    for image, caption in make_predictions(validation_data_iterator(), batch_size=4):
      html_out += render_example(image, caption)
    display(HTML(html_out))
```
    
```
    with open("/home/Ubuntu/output_Evaluate.html", "w") as f:
        f.write(html_out)
    print("HTML content saved to output_Evaluate.html")
```
    
    
```
    #保存微调后的模型
    flat, _ = big_vision.utils.tree_flatten_with_names(params)
    with open("/home/Ubuntu/fine-tuned-paligemma-3b-pt-224.f16.npz", "wb") as f:
      np.savez(f, **{k: v for k, v in flat})
```

##  如有问题请联系我的徽信: stoeng   
  


#  🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇ 

#  👉👉👉 [ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>)

#  👉👉👉 [ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>)
